import express from "express";
import bcryptjs from "bcryptjs";
import db from "../db.js";
import { setTokenVersion, generateJWTokens } from "../auth.js";

const MINUTES_TO_MS = 60000;
const DAYS_TO_MS = 86400000;

const accesstokenExpiration = MINUTES_TO_MS * 15;
const refreshtokenExpiration = DAYS_TO_MS * 7;

const accesstokenCookieOptions = {httpOnly: true, max: accesstokenExpiration, sameSite: 'none' };
const refreshtokenCookieOptions = {httpOnly: true, maxAge: refreshtokenExpiration, sameSite: 'none' };

const authRouter = express.Router();
const addStudent = db.prepare(`INSERT INTO student (first_name, last_name, email, password, token_version) VALUES ( ?, ?, ?, ?, ? );`);
const getUserId = db.prepare(`SELECT student_id FROM student WHERE email = ?`);
const getUserPass = db.prepare(`SELECT password, token_version, student_id FROM student WHERE email = ?`);

authRouter.post("/signup", (req, res) => {
    try{
        let hashed_password = bcryptjs.hashSync(req.body.password, 10);
        addStudent.run(req.body.first_name, req.body.last_name, req.body.email, hashed_password, '0');
        const userId = getUserId.get(req.body.email);

        //Generate JWT Token
        const tokens = generateJWTokens(userId, 'user', 0);

        //Send the token
        return res.cookie('access-token', `Bearer ${tokens.accesstoken}`, accesstokenCookieOptions)
        .cookie('refresh-token', `Bearer ${tokens.refreshtoken}`, refreshtokenCookieOptions)
        .status(200)
        .send("Successfully signed up");
    }
    catch(err){
        console.log(err);
        //Missing data
        if(err.code == "SQLITE_CONSTRAINT_NOTNULL"){
            return res.status(400).send("Missing Data");
        }
        //Email is not unique
        if(err.code == "SQLITE_CONSTRAINT_UNIQUE"){
            return res.status(400).send("There is already an account with that email");
        }
        return res.status(500).send("Server Error");
    }
})

authRouter.post("/login", (req, res) => {
    try{
        const loginData = getUserPass.get(req.body.email);
        if(loginData == null){
            return res.status(400).send("Password or email are incorrect");
        }
        console.log(`query: ${loginData.password}, ${loginData.token_version}`);
        
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, loginData.password);
        if(!isPasswordCorrect){
            return res.status(400).send("Password or email are incorrect");
        }
        
        //Increment the token on new login
        const new_token = loginData.token_version + 1;
        setTokenVersion(new_token, req.body.email);
        
        //Generate JWT Token
        const tokens = generateJWTokens(loginData.student_id, 'user', new_token);
        console.log(tokens);

        //Send the token
        return res.cookie('access-token', `Bearer ${tokens.accesstoken}`, accesstokenCookieOptions)
        .cookie('refresh-token', `Bearer ${tokens.refreshtoken}`, refreshtokenCookieOptions)
        .status(200)
        .send("Successfully logged in");
    }
    catch(err){
        console.log(err);
        res.status(414).send("SOMETHINGS IS VERY WRONG!!");
    }

})


export default authRouter;