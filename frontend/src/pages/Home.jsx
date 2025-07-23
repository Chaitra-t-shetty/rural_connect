import React, { useContext, useState ,useRef} from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.png"
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { userDataContext } from '../context/UserContext';
import EditProfile from '../components/EditProfile';
import { FaLocationDot } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { BsImageFill } from "react-icons/bs";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import Post from '../components/Post';

function Home(){

  let {userData,setUserData,edit,setEdit,postData,setPostData} = useContext(userDataContext)
  let {serverUrl} = useContext(authDataContext)
  let [frontendImage,setFrontendImage] = useState("")
  let [backendImage,setBackendImage] = useState("")
  let [description,setDescription] = useState("")
  let [uploadPost,setUploadPost] = useState(false)
  let image = useRef()
  let [posting,setPosting] = useState(false)

  function handleImage(e){
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  async function handleUploadPost(){
    setPosting(true)
    try{
      let formdata = new FormData()
      formdata.append("description",description)

      if(backendImage){
        formdata.append("image",backendImage)
      }
    let result = await axios.post(serverUrl+"/api/post/create",formdata,{withCredentials:true})
    console.log(result)
    setPosting(false)
    setUploadPost(false)
    }catch(err){
      setPosting(false)
      console.log(err)
    }
  } 

  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-center lg:items-start
    justify-center gap-[20px] px-[20px] flex-col lg:flex-row relative pb-[50px]'>
      {edit && <EditProfile/>}
      <Nav/>

      {/* left div */}
      <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px]
      relative'>
        <div className='w-[100%] h-[100px] bg-[#d6d3d1] rounded overflow-hidden
        flex items-center justify-center relative cursor-pointer'>
          <img src={userData.coverImage || ""} alt="" className='w-full h-full object-cover'/>
          <FiCamera className='absolute  right-[20px] top-[20px] w-[25px] h-[25px]
           text-gray-800 cursor-pointer hover:scale-110 transition-transform duration-200'/>
        </div>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden items-center
        justify-center absolute top-[60px] left-[20px] cursor-pointer ring-2 ring-white shadow-md'>
          <img src={userData.profileImage || dp} alt="" className='h-full'/>
        </div>
        <div className='w-[20px] h-[20px] bg-amber-600 absolute top-[100px]
        left-[78px] rounded-full flex justify-center items-center cursor-pointer'>
            <FiPlus className='text-white hover:scale-110 transition-transform duration-200'/>
        </div>

        <div className='mt-[30px] pl-[20px] text-[18px] font-semibold text-gray-700'>
          <div>{`${userData.firstName} ${userData.lastName}`}</div>
          <div className='text-[15px] font-medium text-gray-600 mt-[4px]'>
            {userData.skills && userData.skills.length > 0
              ? userData.skills.join(", ")
              : "No skills added yet"}
          </div>
          <div className='text-[15px] font-medium text-gray-600 mt-[5px] flex items-center gap-1'>
            <FaLocationDot className='text-amber-600'/>{`${userData.location}`}</div>
        </div>
        <button className='w-[100%] h-[40px] my-[20px] rounded-full border-2 border-amber-600 text-amber-600
            hover:bg-amber-600 hover:text-white transition-all duration-200' 
            onClick={()=>setEdit(true)}>Edit Profile</button>
      </div>
      

      {/* pop-up create post div */}
      {uploadPost &&
      <div className='w-full h-full bg-black absolute top-0 z-[100] left-0 opacity-[0.6]'>

      </div>}
      

      {uploadPost &&
      <div className='w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg absolute z-[200] p-[20px]
      flex items-start justify-start flex-col gap-[20px]'>
        <div className='absolute top-[20px] right-[20px] cursor-pointer'>
            <RxCross1 className='w-[18px] h-[18px] text-gray-800 font-bold cursor-pointer'
             onClick={()=>setUploadPost(false)}/>
        </div>
        <div className='flex justify-start items-center gap-[10px]'>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center
              justify-center cursor-pointer'>
                <img src={userData.profileImage || dp} alt="" className='h-full'/>
        </div>
        <div className='text-[20px]'>{`${userData.firstName} ${userData.lastName}`}</div>
        </div>
        <textarea className={`w-full ${frontendImage?"h-[200px]":"h-[550px]"} outline-none border-none p-[10px]
        resize-none text-[19px]`} placeholder='what do you want to talk about...?' 
        value={description}  onChange={(e)=>setDescription(e.target.value)}></textarea>

          <input type="file" ref={image} hidden onChange={handleImage}/>
          <div className='w-full h-[300px] overflow-hidden flex justify-center items-center '>
            <img src={frontendImage || ""} alt="" className='h-full rounded-lg'/>
          </div>

        <div className='w-full h-[200px] flex flex-col'>
          <div className='p-[20px] flex items-center justify-start border-b-2 border-gray-500'>
            <BsImageFill className='w-[24px] h-[24px] text-gray-500' onClick={()=>image.current.click()}/>
          </div>

          <div className='flex justify-end items-center'>
            <button className='w-[100px] h-[50px] rounded-full bg-[#24b2ff] mt-[40px] text-white 
            hover:bg-[#1a9fe0] transition-colors'disabled={posting} onClick={handleUploadPost}>{posting?"Posting...":"Post"}</button>
          </div>
        </div>
        
      </div>}
      

      {/* mid div */}
      <div className='w-full lg:w-[50%] min-h-[200px] bg-[#f0efe7] flex flex-col gap-[20px]'>
        <div className='w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center
        justify-center gap-[10px]'>

              <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center
              justify-center cursor-pointer'>
                <img src={userData.profileImage || dp} alt="" className='h-full'/>
              </div>
              <button className='w-[80%] h-[60px] border-2 rounded-full border-gray-500 flex items-center
              justify-start px-[20px] hover:bg-gray-200' onClick={()=>setUploadPost(true)}>Start a post</button>
        </div>
        {postData.map((post,index)=>(
          <Post key={index} id={post._id} description={post.description} author={post.author}
          image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt}/>
        ))}
        
      </div>


      {/* right div */}
      <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg'>

      </div>
    </div>
  )
}

export default Home