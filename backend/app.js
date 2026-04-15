import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import "dotenv/config"
import studentRouter from "./routes/studentRouter.js";
import authRouter from './routes/authRouter.js';
import { authenticateToken } from './auth.js';

const app = express();

const logger = function(req, res, next){
  console.log(req.method, req.path, Date.now());
  next();
}

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//Login/Signup
app.use('/auth', authRouter);

//Routes
app.use(authenticateToken);
app.use('/student', studentRouter);

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
