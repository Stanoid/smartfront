import React from 'react'
import DashBoard from '../pages/operation/dashboard'
import Staff from '../pages/operation/staff';
function ContentManager(props) {

    switch(props.content){
   case "dashboard":
    return (
      <div style={{width:"100%",}}> 
 <DashBoard/>
      </div>
     
       )
    break;

    case "staff":
    return (
      <Staff/>
       )
    break;


    }


 
}

export default ContentManager