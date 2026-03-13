import express from "express";
import bcryptjs from "bcryptjs";
import db from "../db.js";
import jwt from "jsonwebtoken"


const rootRouter = express.Router();
const addStudent = db.prepare(`INSERT INTO student (first_name, last_name, email, password) VALUES ( ?, ?, ?, ? );`);
const getUserId = db.prepare(`SELECT student_id FROM student WHERE email = ?`)

rootRouter.post("/signup", (req, res) => {
    try{
        let hashed_password = bcryptjs.hashSync(req.body.password, 10);
        addStudent.run(req.body.first_name, req.body.last_name, req.body.email, hashed_password);
        const userId = getUserId.get(req.body.email);

        //Generate JWT Token
        const payload = { sub: userId, role: 'user' };
        const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });

        const refreshtoken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        //Send the token
        return res
        .cookie('access-token', `Bearer ${accesstoken}`, {httpOnly: true, maxAge: 900000 /* 15 minutes */})
        .cookie('refresh-token', `Bearer ${refreshtoken}`, {httpOnly: true, maxAge: 604800000 /* 7 days */})
        .status(200)
        .send("Approved");
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
        res.status(500).send("Server Error");
    }
})

rootRouter.post("/login", (req, res) => {
    try{
        req.body.password, req.body.email;
    }
    catch(err){

    }

})


export default rootRouter;