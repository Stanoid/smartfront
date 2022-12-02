import React from 'react'

function MenuItem(props) {
  return (
    <div>
    <div  style={{cursor: props.items.link&&props.items.link?'pointer':"default",display:"flex",justifyContent:"flex-start",alignItems:"center",color:"white",fontSize:20}}>
    <div style={{marginRight:5}}><props.items.icon/></div>
       <div> {props.items.text}</div>
     
    </div>
 <div style={{cursor:'pointer',fontSize:13,margin:"7px 0px 5px 23px"}}>
 {props.items&&props.items.subs.map(item=>(
 <div style={{color:"white"}} key={item.id}>
  <div onClick={()=>{props.pageHandler(item.link)}} >{item.text}</div>
 </div>

 ))}
 </div>
   
    
    </div>
  )
}

export default MenuItem