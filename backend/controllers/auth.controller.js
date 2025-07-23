import genToken from "../config/token.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signUp = async(req,res)=>{
    try{
        //input details
        let{firstName,lastName,userName,email,password,location,contactNumber} = req.body;
        let existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"email already exists"})
        }
        let existUsername = await User.findOne({userName})
        if(existUsername){
            return res.status(400).json({message:"username already exists"})
        } 

        //hashing
        let hashedPassword = await bcrypt.hash(password,10)

        //crete user
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password:hashedPassword,
            location,
            contactNumber
        })
        //token generate(inside config/token)
        let token = await genToken(user._id)

        //parse the token in cookie
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite:"None",
            secure:process.env.NODE_ENVIRONMENT==="production"
        })
        return res.status(201).json(user)

        

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"signup error"})
        
    }
}

export const logIn = async(req,res)=>{
    try{
        //input details
        let{email,password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"email does not exists"})
        }
        

        //compared password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        //token generate(inside config/token)
        let token = await genToken(user._id)

        //parse the token in cookie
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite:"None",
            secure:process.env.NODE_ENVIRONMENT==="production"
        })
        return res.status(200).json(user)
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"login error"})
    }
}

export const logOut = async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"logout successfull"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"logout-error"})
    }
}
