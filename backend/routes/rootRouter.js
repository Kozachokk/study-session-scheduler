import express from "express";
import bcryptjs from "bcryptjs";
import db from "../db.js";
import { setTokenVersion, generateJWTokens } from "../auth.js";


const rootRouter = express.Router();
const addStudent = db.prepare(`INSERT INTO student (first_name, last_name, email, password, token_version) VALUES ( ?, ?, ?, ?, ? );`);
const getUserId = db.prepare(`SELECT student_id FROM student WHERE email = ?`);
const getUserPass = db.prepare(`SELECT password, token_version, student_id FROM student WHERE email = ?`);

rootRouter.post("/signup", (req, res) => {
    try{
        let hashed_password = bcryptjs.hashSync(req.body.password, 10);
        addStudent.run(req.body.first_name, req.body.last_name, req.body.email, hashed_password, '0');
        const userId = getUserId.get(req.body.email);

        //Generate JWT Token
        const tokens = generateJWTokens(userId, 'user', 0);

        //Send the token
        return res
        .cookie('access-token', `Bearer ${tokens.accesstoken}`, {httpOnly: true, maxAge: 900000 /* 15 minutes */})
        .cookie('refresh-token', `Bearer ${tokens.refreshtoken}`, {httpOnly: true, maxAge: 604800000 /* 7 days */})
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

rootRouter.post("/login", (req, res) => {
    try{
        const loginData = getUserPass.get(req.body.email);
        if(loginData == null){
            return res.status(400).send("account doesn't exist");
        }
        console.log(`query: ${loginData.password}, ${loginData.token_version}`);
        
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, loginData.password);
        if(!isPasswordCorrect){
            return res.status(400).send("password incorrect");
        }
        
        //Increment the token on new login
        const new_token = loginData.token_version + 1;
        setTokenVersion(new_token, req.body.email);
        
        //Generate JWT Token
        const tokens = generateJWTokens(loginData.student_id, 'user', new_token);

        //Send the token
        return res
        .cookie('access-token', `Bearer ${tokens.accesstoken}`, {httpOnly: true, maxAge: 900000 /* 15 minutes */})
        .cookie('refresh-token', `Bearer ${tokens.refreshtoken}`, {httpOnly: true, maxAge: 604800000 /* 7 days */})
        .status(200)
        .send("Successfully signed up");
    }
    catch(err){
        console.log(err);
        res.status(414).send("SOMETHINGS IS VERY WRONG!!");
    }

})


export default rootRouter;