import React from 'react'
import MenuItem from './menuItem'
import Image from 'next/image'
import {AiOutlineUser} from "react-icons/ai"
function MainMenu(props) {

    const nhand = (o)=>{
        console.log(o)
    }
  return (
   <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",flexDirection:"column",alignItems:"center",height:"100%",padding:20,margin:0}}>
<div><Image src={'/wlo.svg'} width={150} height={60} /></div>
    <div style={{display:"flex",
    padding:"15px 0px 15px 0px",
    flexDirection:"column",alignItems:"flex-start", justifyContent:"center"}} >

    {props.menuItems&&props.menuItems.map(item=>(
 <div key={item.id}>
  <MenuItem pageHandler={(a)=>{props.pageHandler(a)}} items={item} />
 </div>

 ))}

    </div>

    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",color:"white",fontSize:20}}>
    <div style={{marginRight:5}}><AiOutlineUser/></div>
       <div> Profile</div>
     
    </div>
    
   </div>
  )
}

export default MainMenu