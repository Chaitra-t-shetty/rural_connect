import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
dotenv.config()
let port = process.env.PORT || 5000
let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "https://rural-connect-frontend.onrender.com",
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.listen(port,()=>{
    connectDb()
    console.log("server started")
})
