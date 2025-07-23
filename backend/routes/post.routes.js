import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { createPost, getPost , comment , like} from "../controllers/post.controller.js"

const postRouter = express.Router()

postRouter.post("/create",isAuth,upload.single("image"),createPost)
postRouter.get("/getPost",isAuth,getPost)
postRouter.get("/like/:id",isAuth,like)
postRouter.post("/comment/:id",isAuth,comment)

export default postRouter