import express from 'express';
import cors from "cors"
import "dotenv/config"
import studentRouter from "./routes/studentRouter.js";
import rootRouter from './routes/rootRouter.js';

const app = express();

const logger = function(req, res, next){
  console.log(req.method, req.path, Date.now());
  next();
}

app.use(cors())
app.use(express.json())
app.use(logger);
app.use('/', rootRouter)
app.use('/student', studentRouter);

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
