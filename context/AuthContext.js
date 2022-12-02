import { createContext,useState,useEffect } from "react";
import { useRouter } from "next/router";


import { API_URL } from "../utils/url";
import { Flip, Slide, toast,ToastContainer } from 'react-toastify'
const AuthContext = createContext();



export const AuthProvider = (props)=>{

    const[user,setUser] = useState(null);
    const[userData,setuserData] = useState(null);
    const[stype,setStype] = useState(null);
    const[authed,setAuthed] = useState(null);

    const [loading,setLoading]= useState(false);
    const router = useRouter();
    const ls = require("local-storage")
   //const hello ="hello from provider";
    /**
     * adds user to email
     * @param {string} email 
     */
    const loginUser = async (email,password)=>{
    setLoading(1);
        if(email==""||password==""){
            notify("error","Empty email or password")
            setLoading(0);
            return;
        }

        console.log("thiis tokwn",email,password);

            const requestOptions = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "identifier":email,
                   "password":password
                })
            };
            fetch(`${API_URL}/auth/local`, requestOptions)
                .then(response => response.json())
                .then(data =>{
                    console.log(data);
                    
                    if(data.jwt){
                        ls.set("atkn",data.jwt);
                    
                     setUser(data.user.username);
                     setuserData(data.user);
                     setStype(data.user.type)
                     switch(data.user.type){
                       case 1:
                        router.replace("/admin")
                        setLoading(0);
                         break;

                         case 2:
                          router.replace("/operation")
                          setLoading(0);
                           break;

                           case 3:
                            router.replace("/maintenance")
                            setLoading(0);
                             break;


                             case 4:
                              router.replace("/customer_support")
                              setLoading(0);
                               break;


                               case 5:
                                router.replace("/technical_support")
                                setLoading(0);
                                 break;

                                 case 6:
                                  router.replace("/call_center")
                                  setLoading(0);
                                   break;

                                   case 7:
                                    router.replace("/banks")
                                    setLoading(0);
                                     break;

                                     case 9:
                                      router.replace("/operationEmp")
                                      setLoading(0);
                                       break;
                                    
                         

                       
                     }
                       
                    }else{
                        notify("error","Invalid credentials");
                        setLoading(0);
                    }
                });
    
           
    
    
        
     

    }



    const notify = (type,msg)=>{

        const options={
          hideProgressBar:true,
          draggable:true,
          closeButton:false,
          
        }
        switch(type){
          case 'success':
            toast.success(msg,options)
            break;
    
            case 'error':
              toast.error(msg,options)
              break;
    
              case 'warn':
                toast.warn(msg,options)
                break;
    
              
    
        }
       
      }


    /**
     * retreives the token from magic servers
     */

  



   /**
     * set user to null
     *
     */
    const logOutUser = async ()=>{
    
        try{  
            setUser(null);
            router.push("/login");
        }catch(err){

        }
            }


            const log = async ()=>{
               
             
                  }


             const checkLogged = (type)=>{

            
                if(ls.get("atkn")){
                     
                  const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + ls.get("atkn")
                    },
                  
                };
                fetch(`${API_URL}/users/me?populate=*`, requestOptions)
                    .then(response => response.json())
                    .then(data =>{
                 
                     
                      if(data.id){
                    setUser(data.username);
                    setuserData(data);
                    setAuthed(0)
                    setStype(data.type)
                    if(data.type===type){
                     
                    }else{
                      router.replace("/")
                    }
                
                      }else{
                        setUser(null);
                        router.replace("/")
                      }
                         });
                    
                }else{
                   router.replace("/login")
                   router.replace("/")
                }
             }


             const isLogged = async(chk)=>{
              console.log("triggered",chk)
                 // let myPromise = new Promise(function(resolve, reject) {
               
                 // });
   
                   if(ls.get("atkn")){
                        
                     const requestOptions = {
                       method: 'GET',
                       headers: {
                           "Content-Type": "application/json",
                           "Authorization": 'Bearer ' + ls.get("atkn")
                       },
                     
                   };
                   fetch(`${API_URL}/users/me?populate=*`, requestOptions)
                       .then(response => response.json())
                       .then(data =>{
                      // console.log("after call token",ls.get("atkn"))
                         console.log("dataaftercall",data)
   
   
                         if(data.id){
                        
                    
                        setUser(data.username);
                        setuserData(data);
                        setStype(data.type)
                        switch(data.type){
                          case 1:
                        //   notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                           router.replace("/")
                           setLoading(0);
                         
                            break;
   
                            case 2:
                          //   notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                             router.replace("/panel");
                             setLoading(0);
                            
   
                              break;
   
                              case 3:
                             //  notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                               router.replace("/dpanel");
                               setLoading(0);
                             
     
                                break;
   
                                case 4:
                             //    notify("success",`شنو يا مكنة`)
                                 router.replace("/apanel");
                                 setLoading(0);
                               
       
                                  break;
   
                              default:
                             //  notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                               router.replace("/");
                               setLoading(0);
                             
     
                                break;
                        }
                          
                       }else{
                           notify("error","بريد إلكتروني أو كلمة سر خاطئة ");
                           setLoading(0);
                       }
   
                        
                        
                          
                       });
                       
                   }else{
                      router.replace("/")
                   }
                   
   
                   
   
   
                }
   

            useEffect(()=>{
               
                //checkLogged();
            }, [])


return(
    <AuthContext.Provider value={{user,loginUser,logOutUser,notify,isLogged,stype,checkLogged,loading,userData,authed}}>
          <ToastContainer  limit={3}/>
        {props.children}
    </AuthContext.Provider>
)
}

export default AuthContext