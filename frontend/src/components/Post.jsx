import React, { useContext, useState ,useEffect} from 'react'
import dp from "../assets/dp.png"
import moment from "moment"
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { LuSendHorizontal } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';

function Post({id,author,like,comment,description,image,createdAt}) {

    let [more,setMore] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    let {userData , setUserData , getPost ,handleGetProfile} = useContext(userDataContext)
    let [likes,setLikes] = useState(like || [])
    let [commentContent,setCommentContent] = useState("")
    let [comments,setComments] = useState(comment || [])
    let [showComment,setShowComment] = useState(false)
    const handleLike = async()=>{
        try{
            let result = await axios.get(serverUrl+`/api/post/like/${id}`,{withCredentials:true})
            setLikes(result.data.like)
        }catch(err){
            console.log(err)
        }
    }

    const handleComment = async(e)=>{
        e.preventDefault()
        try{
            let result = await axios.post(serverUrl+`/api/post/comment/${id}`,{
                content:commentContent
            },{withCredentials:true})
            setComments(result.data.comment)
            setCommentContent("")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getPost()
    },[])
  return (
    <div className='w-full min-h-[200px] flex flex-col gap-[10px]
     bg-white rounded-lg shadow-lg p-4'>
        <div className='flex justify-between items-center'>
        <div className='flex justify-center items-start gap-[10px]'onClick={()=>handleGetProfile(author.userName)}>
            <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center
            justify-center cursor-pointer' >
            <img src={author.profileImage || dp} alt="" className='h-full'/>
            </div>
            <div>
                <div className='text-lg font-semibold'>{`${author.firstName} ${author.lastName}`}</div>
                <div className='text-sm text-gray-600 font-normal'>{`${author.bio}`}</div>
                <div className='text-xs text-gray-500'> Posted {moment(createdAt).fromNow()}</div>
            </div>
        </div>
        <div>
            <a href={`tel:${author.contactNumber}`} 
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow transition duration-200"
            >
                <FiPhone className="w-4 h-4" />Contact
            </a>
        </div>
        </div>

        <div className={`w-full ${!more?"max-h-[100px] overflow-hidden":""} text-base font-normal`}>{description}</div>
        <div className='pl-[50px] text-[14px] font-semibold cursor-pointer text-blue-600' onClick={()=>setMore(prev=>!prev)}>
            {more?"Read less...":"Read more..."}</div>
        {image && <div className='w-full h-[300px] overflow-hidden flex justify-center rounded-lg'>
            <img src={image} alt="" className='object-cover w-full h-full rounded-lg'/>
        </div>}                             
        
        <div>
            <div className='w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500'>
                <div className='flex items-center justify-center gap-[5px] text-[14px]'>
                    <BiLike className='text-[#1ebbff] w-[20px] h-[20px]'/><span>{likes.length}</span>
                </div>
                <div className='flex items-center justify-center gap-[5px] cursor-pointer'onClick={()=>setShowComment(prev=>!prev)}> 
                    <span>{comment.length}</span><span>comments</span>
                </div>
            </div>
            <div className='flex justify-start items-center w-full p-[20px] gap-[20px]'>
                {!likes.includes(userData._id) &&
                <div className='flex justify-center items-center gap-[10px] 'onClick={handleLike}><BiLike className=' w-[24px] h-[24px]'/>
                <span >Like</span></div>}
                {likes.includes(userData._id) &&
                <div className='flex justify-center items-center gap-[10px] 'onClick={handleLike}><BiSolidLike className=' w-[24px] h-[24px]'/>
                <span className='text-[#07a4ff] font-semibold'>Liked</span></div>}

                <div className='flex justify-center items-center gap-[10px] cursor-pointer' 
                onClick={()=>setShowComment(prev=>!prev)}><FaRegCommentDots className='w-[24px] h-[24px]'/><span>Comment</span></div>
            </div>
            {showComment &&
            <div>
                <form className='w-full flex justify-between items-center border-b-2 border-b-gray-300 p-[10px]
                ' onSubmit={handleComment}>
                    <input type="text" placeholder={"leave a comment"} className='outline-none border-none'value={commentContent} onChange={(e)=>setCommentContent(e.target.value)}/>
                    <button><LuSendHorizontal className='text-[#07a4ff] w-[22px] h-[22px]'/></button>
                </form>
                <div className='flex flex-col gap-[10px]'>
                    {comments.map((com)=>(
                        <div className='flex flex-col gap-[10px] border-b-2 border-b-gray-300 p-[20px]'>
                            <div className='w-full flex justify-start items-center gap-[10px]'>
                                <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex items-center
                                justify-center cursor-pointer'>
                                <img src={com.user.profileImage || dp} alt="" className='h-full'/>
                                </div>
                                <div className='text-lg font-semibold'>{`${com.user.firstName} ${com.user.lastName}`}</div>
                            </div>
                                <div className='pl-[30px]'>
                                    {com.content}
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            }
            
        </div>
    </div>
  )
}

export default Post