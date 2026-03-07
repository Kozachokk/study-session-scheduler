import express from "express";
import Database from "better-sqlite3";
import db from "../db.js"

const studentRouter = express.Router();
const addStudent = db.prepare(`INSERT INTO student (first_name, last_name) VALUES ( ?, ? );`)

studentRouter.post('/add', (req, res) => {
    addStudent.run(req.body.data, req.body.data);
    console.log(req.body.data);
    res.status(200).send("Approved");
})

export default studentRouter;