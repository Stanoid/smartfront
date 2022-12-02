import React from 'react'
import AuthContext from '../../context/AuthContext';
import { useContext,useEffect,useState } from 'react';
import MainLayout from '../../layouts/mainLayout';
import DashBoard from './dashboard';
import { FaBeer } from 'react-icons/fa';
import {AiOutlineAppstore} from "react-icons/ai"
import {BiLineChart,BiReceipt} from "react-icons/bi"
import {CiBoxes} from "react-icons/ci"
import {HiOutlineClipboardDocumentList} from "react-icons/hi";
import {FiSettings} from "react-icons/fi"
function Home() {
  const [page, setPage] = useState("dashboard");
    useEffect(()=>{
checkLogged(2)
              
         
         },[])

  const pageHandler=(remotepage)=>{
    //alert(remotepage )
setPage(remotepage)

  }
        

    const{checkLogged} = useContext(AuthContext)
  return (
    <MainLayout menuItems={[
      {id:1,link:"dashboard",text:"Dashboard",icon:()=>{return <AiOutlineAppstore/>},subs:[
    
     
      ]},
      {id:2,text:"Tasks",icon:()=>{return <BiLineChart/>},subs:[
        {id:1,text:"New Task",link:"staff"},
        {id:2,text:"New Installation",link:"operation report"},
        {id:3,text:"Withdrawl",link:"maintenance report"},
        {id:4,text:"Replacments",link:"providers"},
        {id:5,text:"Alarms ",link:"financial report"},
        {id:6,text:"Maintenance",link:"operation report"},
       ]},
       {id:3,text:"Reports",icon:()=>{return <CiBoxes/>},subs:[
        {id:1,text:"Staff",link:"devices"},
        {id:2,text:"Operations",link:"spare parts"},
        {id:3,text:"Maintenance",link:"consumables"},
        {id:3,text:"Providers",link:"consumables"},
        {id:3,text:"Client Datasheet",link:"consumables"},
 ]},

 {id:4,text:"Stock",icon:()=>{return <BiReceipt/>},subs:[
  {id:1,text:"Device",link:"issue new bill"},
  {id:2,text:"Spare Parts",link:"bills"},
  {id:3,text:"Consumables",link:"income"},

]},


    ]} 
    content={page}
    pageHandler={(a)=>{pageHandler(a)}}
    />
  )
}





export default Home