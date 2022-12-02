import React from 'react'


import {useState,useContext,useEffect} from "react";
import DefaultLayout from '../layouts/Default';
import LoadingBtn from '../comps/loading/loadingbtn';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image';
import AuthContext from '../context/AuthContext';

export default function Login() {
const [emial, setEmial] = useState("");

const [pass, setpass] = useState("");
const [lod, setlod] = useState(0);
const{loginUser,loading,checkLogged,isLogged} = useContext(AuthContext)
const router = useRouter();
const ls = require("local-storage")


useEffect(()=>{

 //isLogged(ls.get("atkn"))
 console.log("aaaa",ls.get("atkn"))

},[])

const handlelogin=()=>{
 setlod(1);
 console.log(loading);
 loginUser(emial,pass)

 

}

   


    return (
      <DefaultLayout>
        <div>
           

          
            <div className=" text-left  to-indigo-600 flex justify-center flex-col items-center w-full">
 

   

      <div className='py-8' style={{zIndex:1}}>
    <Link href="/" class="navbar-brand" >
      <div>
      <Image src={'/nnn.svg'} width={150} height={60} />
      </div>
        </Link>
    </div>

    <div style={{zIndex:1}} className=" px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
       
        <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">E-mail</label>
          <input value={emial}  type="text" onChange={(event)=>{setEmial(event.target.value)}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Password</label>
          <input type="password" value={pass} onChange={(event)=>{setpass(event.target.value)}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
      
      <LoadingBtn act={handlelogin} text={"Login"} lod={loading} />
      {/* <button onClick={()=>{}} className="mt-4 w-full bg-primary text-white py-2 rounded-md text-lg tracking-wide">Login</button> */}
      <button onClick={()=>{router.replace("/register")}} className="mt-4 w-full  text-gray py-2 rounded-md text-lg underline tracking-wide"> Forgot password? </button>
 
    </div>
 
</div>
                {/* <div style={{minHeight:'100vh'}}>
                    <div style={{height:100}}></div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
       <input value={emial} placeholder='email' type={"email"} onChange={(event)=>{setEmial(event.target.value)}} />
       <input value={pass}  placeholder='password' type={"password"} onChange={(event)=>{setpass(event.target.value)}} />
       <div onClick={upload}> 
       Login 
               </div>
               
  </div>
                </div> */}
           
        </div>
        </DefaultLayout>
    )
}
