import React from 'react'
import {FaUserCircle} from "react-icons/fa"
import {AiOutlinePoweroff} from "react-icons/ai"
import { MAIN_STYLE } from '../utils/style'
import AuthContext from '../context/AuthContext';
import { useContext,useEffect } from "react";
function UserHeader() {


    // useEffect(()=>{

     
    //     console.log("aaaa",userData)
       
    //    },[])


    const{userData} = useContext(AuthContext)
  return (

    <div className='grid grid-cols-12' style={{width:"100%",padding:25}}>
       
        <div className='col-span-2' >

        </div>

        <div className='col-span-3' >

        </div>

        <div  className='col-span-7' >
          <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
            <div className='grid grid-cols-12' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              
            <div style={{fontSize:30,color:MAIN_STYLE.primary,paddingRight:15,marginRight:15,borderRight:"1px solid lightgray"}} className='col-span-4'>
                    <AiOutlinePoweroff/>
                </div>
              
                <div className='col-span-4' style={{textAlign:"right",lineHeight:"13px"}}>
                  <div style={{fontSize:14}}>{userData.username}</div>
                  <div style={{fontSize:11}}>{userData.accupation}</div>
                  
                </div>
                <div style={{fontSize:40,color:"lightgray",marginLeft:6}} className='col-span-4'>
                    <FaUserCircle/>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserHeader