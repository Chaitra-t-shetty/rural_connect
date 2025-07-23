import uploadOnCloudinary from "../config/cloudinary.js"
import Post from "../models/post.model.js"

//create post
export const createPost = async(req,res)=>{
    try{
        let {description} = req.body
        let newPost;

        if(req.file){
            let image = await uploadOnCloudinary(req.file.path)
            newPost = await Post.create({
                author:req.userId,
                description , 
                image
            })
        }else{
            newPost = await Post.create({
                author:req.userId,
                description
            });
        }
        return res.status(201).json(newPost);
    }catch(err){
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}

export const getPost = async(req,res)=>{
    try{
        const post = await Post.find()
        .populate("author","firstName lastName profileImage location bio contactNumber userName skills")
        .populate("comment.user","firstName lastName profileImage location bio")
        .sort({createdAt:-1})
        return res.status(200).json(post)
    }catch(err){
        return res.status(500).json({message:"getPost error"})
    }
}

export const like = async(req,res)=>{
    try{
        let postId = req.params.id
        let userId = req.userId

        let post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message:"post not found"})
        }
        if(post.like.includes(userId)){
            post.like = post.like.filter((id)=>id!=userId)
        }else{
            post.like.push(userId)
        }
        await post.save()

        return res.status(200).json(post)
    }catch(err){
        return res.status(500).json({message:`like error ${err}`})
    }
}

export const comment = async(req,res)=>{
    try{
        let postId = req.params.id
        let userId = req.userId
        let {content} = req.body

        let post = await Post.findByIdAndUpdate(postId,{
            $push:{comment:{content,user:userId}}
        },{new:true})
        .populate("comment.user","firstName lastName profileImage bio")
        
        return res.status(200).json(post)
    }catch(err){
        return res.status(500).json({message:`comment error ${err}`})
    }
}