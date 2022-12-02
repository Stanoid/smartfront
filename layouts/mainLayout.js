import React from 'react'
import MainMenu from '../comps/menu/mainmenu'
import ContentManager from './ContentManager'
function mainLayout(props) {
  return (
   
<div style={{overflow:"hidden"}} className=' grid grid-cols-12'>
<div style={{
    
    background: "rgb(55,46,66)",
backgroundColor: "linearGradient(45deg, rgba(55,46,66,1) 0%, rgba(0,0,0,1) 81%)",
    
    height:"100vh",padding:0}} className='col-span-2  '>
<MainMenu pageHandler={(a)=>{props.pageHandler(a)}}  menuItems={props.menuItems} />
</div>
<div style={{height:"100vh",overflow:"scroll",width:"100%"}} className='col-span-10'>

    <ContentManager content={props.content} />
  
</div>

   </div>
  )
}

export default mainLayout