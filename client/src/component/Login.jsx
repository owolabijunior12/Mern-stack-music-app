/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import {FcGoogle} from "react-icons/fc"
import {app} from '../configuration/firebase.configuration';
import {getAuth, GoogleAuthProvider, signInWithPopup}from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {useStateValue} from '../Context/StateProvider'
import { validateUser } from '../api';
import  login_bg from '../Asset/video/login_bg.mp4'



export default function Login ({setAuth}) {
  const firebaseAuth = getAuth(app)
  const provider =new GoogleAuthProvider();
  const navigate  = useNavigate();
  const [{user},  dispatch] = useStateValue();


  
    const loginWithGoogle = async ()=>{
      await signInWithPopup(firebaseAuth, provider)
      .then((userCred)=>{
        if(userCred){
          setAuth(true);
          window.localStorage.setItem("auth", "true");
          firebaseAuth.onAuthStateChanged((userCred)=>{
            if(userCred){

              userCred.getIdToken().then((token)=>{
                console.log(token)
                
                  validateUser({token}.then((data)=>{
                      dispatch({
                        type : actionType.SET_USER,
                        user: data
                      })
                  }))

              })
              console.log(userCred);
              navigate('/',{replace:true})
            }else{
              setAuth(false);
              dispatch({
                type : actionType.SET_USER,
                user: null
              })
              navigate("/login")
            }
          })
        }
          
      })

      console.log("iboytech got it");
    }
    useEffect(()=>{
        if(window.localStorage.getItem("auth")===true){
          navigate('/',{replace:true})
        }
    },[])
  return (
    <div className='relative w-screen h-screen'>
      <video src={login_bg}
        autoPlay
        muted
        loop
        className='w-full h-full object-cover'
            />
        <div className='absolute inset-0 bg-darkOverlay flex justify-center p-4  items-center'>
            <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
                  <div onClick={loginWithGoogle} className=' flex items-center justify-center gap-2 p-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card duration-100 ease-in-out transition-all'>
                      <FcGoogle className='text-xl '/> Sigin with Google
                  </div>                                     
            </div>
        </div>
    </div>
  )
}


