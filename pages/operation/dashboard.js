import React from 'react'
import TableVanilla from '../../comps/table'
import { API_URL } from '../../utils/url';
import { useEffect,useState } from 'react';
import { MAIN_STYLE } from '../../utils/style';
import {TiArrowRightThick} from "react-icons/ti"
import {AiOutlinePlusCircle} from "react-icons/ai"
import VanillaModel from '../../comps/modal';
import { TableTan } from '../../comps/App'
import {RiInstallFill} from "react-icons/ri"
import {HiBellAlert} from "react-icons/hi2"
import {MdSwapHorizontalCircle,MdCancel} from "react-icons/md"
import IndeterminateCheckbox from '../../comps/components/InderterminateCheckbox'
import Selector from '../../comps/selector';
import {BsTools} from "react-icons/bs"
import UserHeader from '../../comps/userHeader';





function DashBoard() {
  const  ls = require('local-storage');
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [Taskopen, setTaskOpen] = useState(false);
  const [opemps, setOpemps] = useState(null);
  const [emp, setEmp] = useState(null);
  const [selectedArr, setSelectedarr] = useState(null);
  useEffect(()=>{


    
     
    getData();
//console.log("aaaaa",props.userData)
       
    
    },[])


    const selectHandler=(stat,id)=>{
      const arr = selected;
     if(stat){

      let index = arr.indexOf(id);
if (index !== -1) {
  arr.splice(index, 1);
}

   
     }else{
      if(arr.includes(id)){
        
      }else{
        arr.push(id);
      }
      
     } 

   setSelectedarr(arr);
    }

  
    async function getData(){
    
      const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + ls.get("atkn")
        },
    };
    fetch(`${API_URL}/requests?func=getOperationRequests`, requestOptions)
        .then(response => response.json())
        .then(data =>{
          let arr = []
          for (let i = 0; i < data.length; i++) {
          
           arr.push(
            {
              select:data[i].id,
            id:data[i].id,
            clientName:data[i].client.username,
            clientId:data[i].client.id,
            clientPhone: data[i].client.phone,
            deviceId:data[i].rent.device.id,
            mid:data[i].rent.device.mid,
            tid:data[i].rent.device.tid,
            model:data[i].rent.device.model.name,
            bankName:data[i].rent.bank.username,
            bankId:data[i].rent.bank.id,
            sector:data[i].rent.sector.name,
            priority:data[i].priority,
            status:data[i].status,
            type:data[i].type,
            asigndate:data[i].asigndate,
            incharge:data[i].incharge.username,
            subRows: []

            
            }
           )
            
          }

          // console.log("extensive object ------->>>",arr)
         
      
       setData(arr);  
      console.log("aaaaaaaaaaaaaaaaa",data) 
           
        });
       // console.log(found)
    }

    const getd = ()=> {
      return data 
      
     }



     const assignTask=()=>{

     if(emp==null){
      return
     }

      console.log("tasks",emp)
setData(null)
      const requestOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + ls.get("atkn")
        },
        body: JSON.stringify({data:{
          tasks:selectedArr,
          emp:emp
        }}),
    };
   
      fetch(`${API_URL}/requests/1?func=assignTask`, requestOptions)
      .then(response => response.json())
      .then(data =>{
    //console.log("emps",data)
    setSelected([])
   setOpen(false);
   getData();
         
      });
    


     }




     
function AssignModel(){
  const  ls = require('local-storage');
 
  
  const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + ls.get("atkn")
    },
};
if(!opemps){
  fetch(`${API_URL}/requests?func=getOpEmp`, requestOptions)
  .then(response => response.json())
  .then(data =>{
console.log("emps",data)
setOpemps(data);
//setEmp(data[0].id)
     
  });
}


 return(
  <div style={{padding:10,height:"20vh"}}>
    
    {opemps?  <Selector setEmp={setEmp} selEmp={emp} data={opemps} />:
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:40,height:30}}
      className="lds-facebookbtn">
        <div style={{background:"#6B617C",borderLeft:" 1px solid white"}}></div>
      <div style={{background:"#6B617C",borderLeft:" 1px solid white"}}></div>
      <div style={{background:"#6B617C",borderLeft:" 1px solid white"}}></div>
      </div>
      <div style={{fontWeight:"bold",color:"#594F68"}}>
       Getting Data
      </div>
      </div>
      </div>
    }

    <div>
    
    </div>
   
  </div>
 )
}











  return (
   
<div style={{width:"100%"}} >
<UserHeader/>

<div style={{padding:50,paddingBottom:10,fontSize:13}} className='grid grid-cols-12 gap-2  w-full h-full'>
  <div style={{backgroundColor:MAIN_STYLE.primary,padding:20,color:"white",display:"flex",justifyContent:"space-between",flexDirection:"column"}} className='col-span-3 h-full rounded-md shadow-md'>
  <div>
  <div style={{color:"white",fontSize:20,fontWeight:"bold",textAlign:"center"}}>
    PENDING TASKS
   </div>
  
 
   </div>
   
   <hr style={{color:"white",margin:10}}/>


   <div>



   <div className='grid grid-cols-12' style={{fontSize:15}}>
  <div className='col-span-2' style={{fontSize:20,display:"flex",justifyContent:"center",alignItems:"center"}}><HiBellAlert/></div>
  <div className='col-span-7'>Alarms</div>
  <div className='col-span-3 text-right' >937</div>
</div>




</div>
<hr style={{color:"white",margin:10}}/>

   <div>

  

<div className='grid grid-cols-12' style={{fontSize:15,marginTop:10,marginBottom:10}}>
  <div className='col-span-2' style={{fontSize:20,display:"flex",justifyContent:"center",alignItems:"center"}}>
    <RiInstallFill/>
    </div>
  <div className='col-span-7'>New Installation</div>
  <div className='col-span-3 text-right' >43</div>
</div>

<div className='grid grid-cols-12' style={{fontSize:15,marginTop:10,marginBottom:10}}>
  <div className='col-span-2' style={{fontSize:20,display:"flex",justifyContent:"center",alignItems:"center"}}><HiBellAlert/></div>
  <div className='col-span-7'>Withdrawl</div>
  <div className='col-span-3 text-right' >937</div>
</div>

<div className='grid grid-cols-12' style={{fontSize:15,marginTop:10,marginBottom:10}}>
  <div className='col-span-2' style={{fontSize:20,display:"flex",justifyContent:"center",alignItems:"center"}}>
    <MdSwapHorizontalCircle/>
    </div>
  <div className='col-span-7'>Replacement</div>
  <div className='col-span-3 text-right' >344</div>
</div>



  
   </div>
   <hr style={{color:"white",margin:10}}/>

   <div>


<div className='grid grid-cols-12' style={{fontSize:15}}>
<div className='col-span-2' style={{fontSize:20,display:"flex",justifyContent:"center",alignItems:"center"}}>
 <BsTools/>
 </div>
<div className='col-span-7'>Maintenance</div>
<div className='col-span-3 text-right' >23</div>
</div>




</div>


    
  </div>
  <div  className='col-span-7 h-full'>
    <div className='grid grid-cols-12 gap-2 h-full'>




    <div  className='col-span-6 rounded-md shadow-md' >
     <div className='w-full' style={{padding:20}} >
     <div style={{fontSize:20,fontWeight:"bold",color:MAIN_STYLE.primary}}>
      STOCK
     </div>
     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-4 text-left' >Devices</div>
      <div className='col-span-6  text-center' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-opacity-30 bg-gray">
  <div className="bg-primary h-2.5 rounded-full" style={{width:"36%"}}></div>
</div>
      </div>
      <div className='col-span-2  text-right'>36%</div>
     </div>
     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-4 text-left' >Spare parts</div>
      <div className='col-span-6  text-center' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-opacity-30 bg-gray">
  <div className="bg-primary h-2.5 rounded-full" style={{width:"87%"}}></div>
</div>
      </div>
      <div className='col-span-2  text-right'>87%</div>
     </div>
     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-4 text-left' >Paper roll</div>
      <div className='col-span-6  text-center' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-opacity-30 bg-gray">
  <div className="bg-primary h-2.5 rounded-full" style={{width:"3%"}}></div>
</div>
      </div>
      <div className='col-span-2  text-right'>3%</div>
     </div>
     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-4 text-left' >Chargers</div>
      <div className='col-span-6  text-center' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-opacity-30 bg-gray">
  <div className="bg-primary h-2.5 rounded-full" style={{width:"100%"}}></div>
</div>
      </div>
      <div className='col-span-2  text-right'>100%</div>
     </div>
     </div>
    </div>
   


    <div  className='col-span-6 rounded-md shadow-md' >
     <div className='w-full' style={{padding:20}} >
     <div style={{fontSize:20,fontWeight:"bold",color:MAIN_STYLE.primary}}>
      NEW REQUESTS
     </div>
     <div className='grid grid-cols-12 w-full gap-5'>
      <div className='col-span-6 text-left' >
      <div className='grid grid-cols-12 w-full'>
      <div className='col-span-9 text-left' >Installation:</div>
      <div className='col-span-3  text-right'>36</div>
     </div>

     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-9 text-left' >Cancelation:</div>
      <div className='col-span-3  text-right'>200</div>
     </div>

     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-9 text-left' >Replacement:</div>
      <div className='col-span-3  text-right'>23</div>
     </div>

      </div>
      <div className='col-span-6  text-right'>
      <div className='grid grid-cols-12 w-full'>
      <div className='col-span-9 text-left' >Maintenance:</div>
      <div className='col-span-3  text-right'>12</div>
     </div>

     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-9 text-left' >Maintenance:</div>
      <div className='col-span-3  text-right'>12</div>
     </div>

     <div className='grid grid-cols-12 w-full'>
      <div className='col-span-9 text-left' >Non-assigned:</div>
      <div className='col-span-3  text-right' style={{fontWeight:"bold",color:"red"}}>23</div>
     </div>
      </div>
     </div>
   
   
   
     </div>
    </div>



   
    <div  className='col-span-12 rounded-md shadow-md'>

    <div className='w-full' style={{padding:20}} >
     <div style={{fontSize:20,fontWeight:"bold",color:MAIN_STYLE.primary}}>
      STAFF
     </div>
    <div className='grid grid-cols-12 h-full'>
      <div className='col-span-3 h-full' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{fontWeight:"bold", color:MAIN_STYLE.primary}}>Tasks Completed By Week</div>
      </div>

      <div className='col-span-9 h-full' style={{display:"flex",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
      <div className='grid grid-cols-12 w-full'>
      <div className='col-span-4'>
      <div style={{color:MAIN_STYLE.primary,fontSize:15,fontWeight:"bold"}}>Employee 1</div>
        <div style={{fontWeight:"bold",fontSize:30, color:MAIN_STYLE.primary}}>
          23
        </div>
        </div>

        <div className='col-span-4'>
      <div style={{color:MAIN_STYLE.primary,fontSize:15,fontWeight:"bold"}}>Employee 1</div>
        <div style={{fontWeight:"bold",fontSize:30, color:MAIN_STYLE.primary}}>
          23
        </div>
        </div>


        <div className='col-span-4'>
      <div style={{color:MAIN_STYLE.primary,fontSize:15,fontWeight:"bold"}}>Employee 1</div>
        <div style={{fontWeight:"bold",fontSize:30, color:MAIN_STYLE.primary}}>
          23
        </div>
        </div>
      </div>
      </div>
    </div>
   
   
   
     </div>

      
    </div>
    </div>
  </div>
  <div className='col-span-2 h-full'>

  <div className='grid grid-cols-12 gap-2'>
    <div className='col-span-12 rounded-md shadow-md ' onClick={()=>{setTaskOpen(true)}} style={{padding:10,cursor:"pointer"}}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",textAlign:"center"}}>
        <div style={{fontWeight:"bold",fontSize:30,color:MAIN_STYLE.primary,whiteSpace:"break-spaces"}}>NEW<br/>TASK</div>
       <div style={{color:MAIN_STYLE.primary,fontSize:60,fontWeight:"bold"}}>
       <AiOutlinePlusCircle/>
       </div>
       
      </div>
      
      </div> 
      <div className='col-span-12 rounded-md shadow-md ' style={{padding:10}}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",textAlign:"center"}}>
        <div style={{fontWeight:"bold",fontSize:30,color:MAIN_STYLE.primary,whiteSpace:"break-spaces"}}>NEW<br/>ALARM</div>
       <div style={{color:MAIN_STYLE.primary,fontSize:60,fontWeight:"bold"}}>
       <AiOutlinePlusCircle/>
       </div>
       
      </div>
      
      </div> 
    </div>
    
  </div>
</div>



<div className='col-span-2' style={{padding:10}}>

{data?<TableTan colomn={
    [
      {
        id: 'select',
        
        header:"SELECT",
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              onClick={()=>{selectHandler(row.getIsSelected(),row.original.id)}}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
     
     
          {
            header:'CLIENT',
            accessorKey: 'clientName',
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'TYPE',
            accessorFn: (row) => {
             // console.log(row.status)
           switch(row.type){
            case 1:
               return <div style={{whiteSpace:"nowrap"}}>New Install</div>
               break;

               case 2:
               return <div style={{whiteSpace:"nowrap"}}>Repair</div>
               break;
               case 3:
                return <div style={{whiteSpace:"nowrap"}}>Withdrawl</div>
                break;
              }
           
            },
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'STATUS',
            accessorFn: (row) => {
              console.log(row.status)
           switch(row.status){
            case "1":
               return <div style={{color:"grey",fontWeight:"bold",lineBreak:"none",fontSize:13,whiteSpace:"nowrap"}}>Not Initiated</div>
               break;

               case "2":
                return <div style={{color:"orange",fontWeight:"bold",lineBreak:"none",fontSize:13,whiteSpace:"nowrap"}}>On Hold</div>
                break;
                case "3":
                  return <div style={{color:"green",fontWeight:"bold",lineBreak:"none",fontSize:13,whiteSpace:"nowrap"}}>Ready</div>
                  break;
              }
           
            },
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'TID',
            accessorKey: 'tid',
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'MID',
            accessorKey: 'mid',
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'SECTOR',
            accessorKey: 'sector',
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'PROVIDER',
            accessorKey: 'bankName',
             enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
          {
            header:'DEVICE',
            accessorKey: 'model',
            enableColumnFilter:true,
            cell: info =><div style={{whiteSpace:"nowrap"}}> {info.getValue()}</div>,
          },
    
          {
            header:'PHONE',
            accessorKey: 'clientPhone',
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
        
          {
            header:'PRIORITY',
            accessorFn: (row) => {
              // console.log(row.status)
            switch(row.priority){
             case "1":
                return <div style={{whiteSpace:"nowrap", color:"green"}}>Low</div>
                break;
 
                case "2":
                return <div style={{whiteSpace:"nowrap",color:"orange"}}>Medium</div>
                break;
                case "3":
                 return <div style={{whiteSpace:"nowrap",color:"red"}}>HIGH</div>
                 break;
               }
            
             },
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
    
        
          {
            header:'ASSIGNED',
            accessorKey: 'asigndate',
            enableColumnFilter:true,
            cell: info => info.getValue(),
          },
          {
            header:'INCHARGE',
            accessorKey: 'incharge',
            enableColumnFilter:true,
            cell: info => <div style={{whiteSpace:"nowrap"}}>{info.getValue()}</div>,
          },
        
        
    
        
          // {
          //   accessorFn: row => `${row.firstName} ${row.lastName}`,
          //   id: 'fullName',
          //   header: 'Full Name',
          //   cell: info => info.getValue(),
         
          //   filterFn: fuzzyFilter,
          //   sortingFn: fuzzySort,
          // },
        
      
          // {
          //   accessorKey: 'age',
          //   header: () => 'Age',
           
          // },
        
          //     {
          //       accessorKey: 'visits',
          //       header: () => <span>Visits</span>,
               
          //     },
          //     {
          //       accessorKey: 'status',
          //       header: 'Status',
              
          //     },
          //     {
          //       accessorKey: 'progress',
          //       header: 'Profile Progress',
               
          //     },
    ]
    
  } data={data}/>:<div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
   <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:40,height:30}}
    className="lds-facebookbtn">
      <div style={{background:"#6B617C",borderLeft:" 1px solid white"}}></div>
    <div style={{background:"#6B617C",borderLeft:" 1px solid white"}}></div>
    <div style={{background:"#6B617C",borderLeft:" 1px solid white"}}></div>
    </div>
    <div style={{fontWeight:"bold",color:"#594F68"}}>
     Getting Data
    </div>
    </div>
    </div>} 


<div style={{position:"fixed",bottom:0,right:0,padding:15}}> 
<div style={{padding:15}}>
<div onClick={()=>{setOpen(true)}} style={{cursor:"pointer",padding:"10px 15px 10px 15px",backgroundColor:"#4ABC96",color:"white",fontWeight:"white",borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
<div style={{fontWeight:"bold",marginRight:10}}>Assign</div>
<div><TiArrowRightThick/></div>
</div>

</div>

</div>
</div>


<VanillaModel action={"Create Task"} actionFunc={()=>{assignTask()}} 
title={"Create A New Task"}
 setopen={(st)=>{setTaskOpen(st)}} 
 open={Taskopen}
 content={<AssignModel/>} />


<VanillaModel action={"Assign"} actionFunc={()=>{assignTask()}} 
title={"Assign tasks"}
 setopen={(st)=>{setOpen(st)}} 
 open={open}
 content={<AssignModel/>} />
   </div>
  )
}

export default DashBoard