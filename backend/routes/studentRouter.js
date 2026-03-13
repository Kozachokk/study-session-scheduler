import express from "express";
import db from "../db.js";


const studentRouter = express.Router();
const addStudent = db.prepare(`INSERT INTO student (first_name, last_name, email, password) VALUES ( ?, ?, ?, ? );`);
const getUserId = db.prepare(`SELECT student_id FROM student WHERE email = ?`)

studentRouter.post('/add', (req, res) => {
    
})

studentRouter.get('/login', (res, req) => {
    
})

export default studentRouter;