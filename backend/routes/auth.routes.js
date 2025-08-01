import express from 'express'
import { logIn, logOut, signUp } from '../controllers/auth.controller.js';


let authRouter = express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",logIn)
authRouter.get("/logout",logOut)

export default authRouter