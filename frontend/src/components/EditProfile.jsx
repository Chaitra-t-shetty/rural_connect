import React, { useContext, useState, useRef } from 'react'
import { RxCross1 } from "react-icons/rx";
import { userDataContext } from '../context/UserContext';
import dp from "../assets/dp.png"
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function EditProfile() {
    let {serverUrl} = useContext(authDataContext)
    let {userData,setUserData,edit,setEdit} = useContext(userDataContext)
    let [firstName, setFirstName] = useState(userData.firstName)
    let [lastName, setLastName] = useState(userData.lastName )
    let [userName, setUserName] = useState(userData.userName)
    let [bio,setBio] = useState(userData.bio || "")
    let [location, setLocation] = useState(userData.location)
    let [contactNumber, setContactNumber] = useState(userData.contactNumber)
    let [gender , setGender] = useState(userData.gender || "")
    let [isAvailable, setIsAvailable] = useState(userData.isAvailable);
    let [skills,setSkills] = useState(userData.skills || [])
    let [newSkills , setNewSkills]  = useState("")

    let [frontendProfileImage,setFrontendProfileImage] = useState(userData.profileImage || dp)
    let [backendProfileImage,setBackendProfileImage] = useState(null)
    let [frontendCoverImage,setFrontendCoverImage] = useState(userData.coverImage || null)
    let [backendCoverImage,setBackendCoverImage] = useState(null)
    let [saving,setSaving] = useState(false)
    const profileImage = useRef()
    const coverImage = useRef()

    function addSkill(){
        if(newSkills && !skills.includes(newSkills)){
            setSkills([...skills,newSkills])
        }
        setNewSkills("")
    }

    function removeSkill(skill){
        if(skills.includes(skill)){
            setSkills(skills.filter((s)=>s!=skill))
        } 
    }

    function handleProfileImage(e){
        let file = e.target.files[0]
        setBackendProfileImage(file)
        setFrontendProfileImage(URL.createObjectURL(file))
    }

     function handleCoverImage(e){
        let file = e.target.files[0]
        setBackendCoverImage(file)
        setFrontendCoverImage(URL.createObjectURL(file))
    }
    //data is sent as form-data
    const handleSaveProfile = async()=>{
        setSaving(true)
        try{
            let formdata = new FormData()
            formdata.append("firstName",firstName)
            formdata.append("lastName",lastName)
            formdata.append("userName",userName)
            formdata.append("bio",bio)
            formdata.append("location",location)
            formdata.append("gender",gender)
            formdata.append("skills",JSON.stringify(skills))
            formdata.append("isAvailable",isAvailable)
            formdata.append("contactNumber",contactNumber)

            if(backendProfileImage){
                formdata.append("profileImage",backendProfileImage)
            }
            if(backendCoverImage){
                formdata.append("coverImage",backendCoverImage)
            }

            let result = await axios.put(serverUrl+"/api/user/updateprofile",formdata,{withCredentials:true})
            setUserData(result.data)
            setSaving(false)
            setEdit(false)
        }catch(err){

        }
    }
  return (

    <div className='w-full h-[100vh] fixed top-0 z-[100] flex justify-center
    items-center'>
        <input type="file" accept='image/*' hidden ref={profileImage} onChange={handleProfileImage}/>
        <input type="file" accept='image/*' hidden ref={coverImage} onChange={handleCoverImage}/>
        <div className='w-full h-full  bg-black opacity-[0.5] absolute'></div>
        <div className='w-[90%] max-w-[500px] h-[600px] bg-white relative
        z-[200] shadow-lg rounded-lg p-[10px] overflow-auto'>
        
            <div className='absolute top-[20px] right-[20px] cursor-pointer' 
            onClick={()=>setEdit(false)}>
                <RxCross1 className='w-[25px] h-[25px] text-gray-800 font-bold'/>
            </div>

            {/* coverimage */}
            <div className='w-full h-[150px] bg-[#d6d3d1] rounded-lg mt-[40px] overflow-hidden' onClick={()=>coverImage.current.click()}>
                <img src={frontendCoverImage} alt="" className='w-full' />
                <FiCamera className='absolute right-[20px] top-[60px] w-[25px] h-[25px]
                text-gray-800 cursor-pointer hover:scale-110 transition-transform duration-200'/>  
            </div>
            <div className='w-[80px] h-[80px] rounded-full overflow-hidden absolute 
            top-[150px] ml-[20px]' onClick={()=>profileImage.current.click()}>
                <img src={frontendProfileImage} alt="" className='w-full h-full'/>
            </div>
            <div className='w-[20px] h-[20px] bg-amber-600 absolute top-[195px]
            left-[95px] rounded-full flex justify-center items-center cursor-pointer'>
                <FiPlus className='text-white hover:scale-110 transition-transform duration-200'/>
            </div>

            <div className='w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
                <input type="text" placeholder='firstName'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" placeholder='lastName'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                <input type="text" placeholder='userName'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input type="text" placeholder='bio'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={bio} onChange={(e)=>setBio(e.target.value)}/>
                <input type="text" placeholder='location'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={location} onChange={(e)=>setLocation(e.target.value)}/>
                <input type="text" placeholder='contactNumber'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)}/>
                <input type="text" placeholder='gender(male/female/other)'  className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={gender} onChange={(e)=>setGender(e.target.value)}/>
                <select className='w-full h-[50px] outline-none
                border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg'
                value={isAvailable}  onChange={(e) => setIsAvailable(e.target.value === "true")}>
                    <option value="true">Available for Work</option>
                    <option value="false">Not Available</option>
                </select>
                <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px]'>
                    <h1>Skills</h1>
                    {skills && <div className='flex flex-col gap-[10px]'>
                        {skills.map((skill,index)=>(
                            <div key={index} className='w-full h-[40px] border-[1px] border-gray-600
                            bg-gray-200 rounded-lg p-[10px] flex justify-between items-center'><span>{skill}</span>
                            <RxCross1 className='w-[18px] h-[18px] text-gray-800 font-bold' onClick={()=>removeSkill(skill)}/>
                            </div>
                        ))}
                    </div>}
                    <div className='flex flex-col gap-[10px] items-start' >
                        <input type="text" placeholder="add new skill" value={newSkills} onChange={(e)=>setNewSkills(e.target.value)}
                        className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg'/>
                        <button className='w-[100%] h-[40px] rounded-full border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200'
                        onClick={addSkill}>Add</button>
                    </div>
                </div>
                <button className='w-full h-[50px] rounded-full bg-[#1dc9fd] text-white font-medium hover:bg-[#19b5e1] transition-all mt-4' disable={saving}
                onClick={()=>handleSaveProfile()}>{saving?"Saving...":"Save Profile"}</button>
                
            </div>
        </div>
    </div>
  )
}

export default EditProfile