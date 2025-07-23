import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.png"
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { userDataContext } from '../context/UserContext';
import { FaLocationDot } from "react-icons/fa6";
import EditProfile from '../components/EditProfile';
import Post from '../components/Post';
function Profile() {
    let {userData,setUserData,edit,setEdit,postData,setPostData,profileData,setProfileData} = useContext(userDataContext)
    let [profilePost,setProfilePost] = useState([])
    useEffect(()=>{
      setProfilePost(postData.filter((post)=>post.author._id == profileData._id))
    },[profileData])
  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center pt-[110px] pb-[20px]'>
        <Nav/>
        {edit && <EditProfile/>}
        
        <div className='w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px]'>
            <div className='relative bg-amber-50 pb-[40px] rounded-lg shadow-lg'>
                <div className='w-[100%] h-[100px] bg-[#d6d3d1] rounded overflow-hidden
                        flex items-center justify-center relative cursor-pointer'>
                          <img src={profileData.coverImage || ""} alt="" className='w-full h-full object-cover'/>
                          <FiCamera className='absolute  right-[20px] top-[20px] w-[25px] h-[25px]
                           text-gray-800 cursor-pointer hover:scale-110 transition-transform duration-200'/>
                        </div>
                        <div className='w-[70px] h-[70px] rounded-full overflow-hidden items-center
                        justify-center absolute top-[60px] left-[20px] cursor-pointer ring-2 ring-white shadow-md'>
                          <img src={profileData.profileImage || dp} alt="" className='h-full'/>
                        </div>
                        <div className='w-[20px] h-[20px] bg-amber-600 absolute top-[100px]
                        left-[78px] rounded-full flex justify-center items-center cursor-pointer'>
                            <FiPlus className='text-white hover:scale-110 transition-transform duration-200'/>
                        </div>
                
                        <div className='mt-[30px] pl-[20px] text-[18px] font-semibold text-gray-700'>
                          <div>{`${profileData.firstName} ${profileData.lastName}`}</div>
                          <div className='text-[15px] font-medium text-gray-600 mt-[4px]'>
                            {profileData.skills && profileData.skills.length > 0
                              ? profileData.skills.join(", ")
                              : "No skills added yet"}
                          </div>
                          <div className='text-[15px] font-medium text-gray-600 mt-[5px] flex items-center gap-1'>
                            <FaLocationDot className='text-amber-600'/>{`${profileData.location}`}</div>
                        </div>
                        {profileData._id == userData._id &&
                        <button className='min-w-[150px] h-[40px] my-[20px] ml-2 rounded-full border-2 border-amber-600 text-amber-600
                            hover:bg-amber-600 hover:text-white transition-all duration-200' 
                            onClick={()=>setEdit(true)}>Edit Profile</button>
                        }
                        {profileData._id != userData._id &&
                          <div className='w-[110px] pl-5.5 mt-2'>
                                <a href={`tel:${profileData.contactNumber}`} 
                                className="flex items-center gap-2 bg-amber-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded-lg shadow transition duration-200"
                                >
                                  <FiPhone className="w-4 h-4" />Contact
                                </a>
                          </div>

                        }
                        
            </div>

            <div className='w-full h-[100px] flex items-center p-[20px] text-[22px] text-gray-600
            font-semibold bg-white shadow-lg '>
              {`Post (${profilePost.length})`}
            </div>
            {profilePost.map((post,index)=>(
              <Post key={index} id={post._id} description={post.description} author={post.author}
          image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt}/>
            ))}
{profileData.skills.length > 0 && (
  <div className="w-full flex flex-col gap-[16px] p-[20px] bg-white shadow-lg rounded-xl">
    <div className="text-[18px] font-semibold text-gray-700">Skills</div>
    <div className="flex flex-wrap gap-3">
      {profileData.skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full border border-amber-300 hover:bg-amber-200 transition-all duration-200"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
)}


        </div>
        </div>
  )
}

export default Profile