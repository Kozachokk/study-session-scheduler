import express from "express"

const rootRouter = express.Router();

rootRouter.get("/", (_req, res)=>{
    res.send("<h1>Hello</h1>")
})

export default rootRouter;