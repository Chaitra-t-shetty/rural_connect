import React, { useContext, useEffect, useState } from 'react'
import logo2 from "../assets/logo2.png"
import dp from "../assets/dp.png"
import { IoSearchSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Nav() {
  let [activeSearch,setActiveSearch] = useState(false)
  let {userData,setUserData,handleGetProfile} = useContext(userDataContext)
  let [showPopup , setShowPopup] = useState(false)
  let [searchInput,setSearchInput] = useState("")
  let [searchData,setSearchData] = useState([])
  let {serverUrl} = useContext(authDataContext)
  let navigate = useNavigate()
  const handleSignOut = async()=>{
    try{
        let result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
        setUserData(null)
        navigate("/login")
        console.log(result);
        
    }catch(err){
        console.log(err);
    }
  }

    const handleSearch = async()=>{
        try{
            let result = await axios.get(`${serverUrl}/api/user/search?query=${searchInput}`,{withCredentials:true})
            console.log(result.data)
            setSearchData(result.data)
        }catch(err){
            console.log(err)
        }
    }
    // tab run ho jab search bar mey kuch input ho
useEffect(() => {
  if (searchInput.trim() !== "") {
    handleSearch();
  } else {
    setSearchData([]); // clear results when input is empty
  }
}, [searchInput]);

  return (
    <div className='w-full h-[80px] bg-[#fef8f1] fixed top-0 shadow-lg flex 
    justify-between md:justify-around items-center px-[10px] left-0 z-[80]'>
    <div className='flex justify-center items-center gap-[10px] '>
        <div onClick={()=>{
            setActiveSearch(false)
            navigate("/")
        }}>
            <img src={logo2} alt="" className='w-[50px]'/>
        </div>
        {!activeSearch && <div><IoSearchSharp className='w-[23px] h-[23px] text-gray-700 lg:hidden'
        onClick={()=>setActiveSearch(true)}/></div>}

{searchData.length > 0 && (
  <div className="absolute top-[90px] left-0 lg:left-[21px] w-full lg:w-[700px] bg-white shadow-lg rounded-xl p-4 z-50
  h-[500px] overflow-auto">
    {searchData.map((sea, index) => (
      <div
        key={index}
        className="flex gap-4 items-start border-b border-gray-200 py-4 hover:bg-gray-50 transition-all "
        onClick={()=>handleGetProfile(sea.userName)}
      >
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
          <img
            src={sea.profileImage || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Block */}
        <div className="flex flex-col">
          {/* Name */}
          <span className="text-lg font-semibold text-gray-800">
            {`${sea.firstName} ${sea.lastName}`}
          </span>

          {/* Location */}
          <span className="text-sm text-gray-500">
            {sea.location}
          </span>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-1">
            {sea.skills?.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        
        
        <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${!activeSearch?"hidden":"flex"}`}>
            <div><IoSearchSharp className='w-[23px] h-[23px] text-gray-700 cursor-pointer'/></div>
            <input type="text" className='w-[80%] h-full bg-transparent outline-none
            border-0' placeholder='search people or skills..'value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
        </form>
    </div>

    <div className='flex justify-center items-center gap-[20px] relative'>
        {showPopup && 
        <div className='w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg flex
        flex-col items-center p-[20px] gap-[20px]'>
            <div className='w-[70px] h-[70px] rounded-full overflow-hidden border-gray-300'>
                <img src={userData.profileImage || dp} alt="" />
            </div>
            <div className='text-[18px] font-semibold text-gray-700'>
                {`${userData.firstName} ${userData.lastName}`}
            </div>
            <button className='w-[100%] h-[40px] rounded-full border-2 border-amber-600 text-amber-600
            hover:bg-amber-600 hover:text-white transition-all duration-200' onClick={()=>handleGetProfile(userData.userName)}>View Profile</button>
            <div className='w-full h-[1px] bg-gray-600'></div>
            <div className='flex w-full items-center justify-start text-gray-600 gap-[10px] cursor-pointer'>
            <FaUserGroup className='w-[23px] h-[23px] text-gray-600'/>
            <div>My Circle</div>
            </div>
            <button className='w-[100%] h-[40px] rounded-full border-2 border-red-500 text-red-500 font-medium
             hover:bg-red-500 hover:text-white transition-all duration-200' onClick={handleSignOut}>LogOut</button>
        </div>}
        



        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden hover:text-amber-600 cursor-pointer'>
            <TiHome className='w-[23px] h-[23px] text-gray-600'/>
            <div>Home</div>
        </div>
        <div className='md:flex flex-col items-center justify-center text-gray-600 hidden hover:text-amber-600 cursor-pointer'>
            <FaUserGroup className='w-[23px] h-[23px] text-gray-600'/>
            <div>My Circle</div>
        </div>
        <div className='flex flex-col items-center justify-center text-gray-600 hover:text-amber-600 cursor-pointer'>
            <IoNotificationsSharp className='w-[23px] h-[23px] text-gray-600'/>
            <div className='hidden md:block'>Updates</div>
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden hover:text-amber-600 cursor-pointer'
        onClick={()=>setShowPopup(prev=>!prev)}>
            <img src={userData.profileImage || dp} alt="" />
        </div>
    </div>
        
    </div>
  )
}

export default Nav