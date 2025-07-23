import express from "express"
import { getCurrentUser, getProfile, search, updateProfile } from "../controllers/user.controller.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

let userRouter = express.Router()
userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/updateProfile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)
userRouter.get("/profile/:userName",isAuth,getProfile)
userRouter.get("/search",isAuth,search)

export default userRouter