import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { userDataContext } from '../context/UserContext'

function Login() {
  let [show , setShow] = useState(false) //default password not showed
  let {serverUrl} = useContext(authDataContext)
  let {userData,setUserData} = useContext(userDataContext)
  let navigate = useNavigate()  
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [err,setErr] = useState("")
  const handleLogIn = async (e)=>{
    e.preventDefault()
    try{
      let result = await axios.post(serverUrl+"/api/auth/login",{
        email,
        password
      },{withCredentials:true})
      setUserData(result.data)
      navigate("/")
      setErr("")
      setEmail("")
      setPassword("")
    }catch(err){
      setErr(err.response.data.message)
    }
  }

  return (
    <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start'>
        <div className='mt-4 mb-4 text-center px-4'>
        <h1 className='text-3xl font-extrabold text-amber-500 drop-shadow-sm'>
          Your Talent. Your Identity. Your Platform.
        </h1>
        <p className='mt-2 text-gray-600 text-base italic'>
          Join RuralConnect to showcase your work and get discovered locally.
        </p>
      </div>
        <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex
        flex-col justify-center gap-[9px] p-[15px]' onSubmit={handleLogIn}>
            <h1 className='text-gray-800 text-[30px] front-semibold mb-5'>Log In</h1>

            <input type="email" placeholder='email' required className='w-[100%] h-[50px]
            border-2 border-gray-600 text-gray-800 text-[18px] px-5 py-5 rounded-md'
            value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md relative'>
              <input type={show?"text":"password"} placeholder='password' required className='w-full h-full
               border-none text-gray-800 text-[18px] px-5 py-5 rounded-md'
               value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <span className='absolute right-[20px] top-[10px] text-[#1dc9fd] cursor-pointer font-semibold'
              onClick={()=>setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
            </div>
            
            {err && <p className='text-center text-red-500'>*{err}</p>}
            <button className='w-full h-[50px] rounded-full bg-[#1dc9fd] text-white font-medium hover:bg-[#19b5e1] transition-all mt-4'>LogIn</button>
            <p className='text-center cursor-pointer' onClick={()=>{navigate("/signup")}}>Want to create a new account? <span className='text-[#1dc9fd]'>Sign up</span></p>
        </form>
    </div>
  )
}

export default Login