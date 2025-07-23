import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    bio: {
        type: String,
        default: ""
    },
    skills: {
        type: [String]
    },
    experience: [
        {
            title: { type: String },
            company: { type: String },
            description: { type: String }
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true // Whether user is available for work
    },
    location:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    contactNumber: {
        type: String, // For WhatsApp/calls
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit number']
    },
    connection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{timestamps:true})

export default mongoose.model("User", userSchema)