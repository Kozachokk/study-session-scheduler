import express from "express";
import Database from "better-sqlite3";
import db from "../db.js"

const studentRouter = express.Router();
const addStudent = db.prepare(`INSERT INTO student (first_name, last_name, email, password) VALUES ( ?, ?, ?, ? );`)

studentRouter.post('/add', (req, res) => {
    if(req.body.first_name == null || req.body.last_name == null || req.body.email == null || req.body.password == null){
        res.status(400).send("Missing data");
        return;
    }
    addStudent.run(req.first_name, req.last_name, req.email, req.password);
    console.log(req.body);
    res.status(200).send("Approved");
})

export default studentRouter;