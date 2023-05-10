/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import  Home from './component/Home';
import Login from './component/Login';
import Dashboard  from './component/Dashboard';
import MusicPlayer from './component/MusicPlayer';
import { getAuth } from 'firebase/auth'
import { AnimatePresence,motion } from 'framer-motion';
import { app } from './configuration/firebase.configuration'
import { validateUser } from './api';
import { actionType } from "./Context/reducer";
import About from './component/About';
import {useStateValue} from './Context/StateProvider'


const App = () => {
  const firebaseAuth = getAuth(app)
  const nagivate = useNavigate();
  const [{users,isSongPlaying}, dispatch] = useStateValue();
  const [auth,setAuth] = useState(false || window.localStorage.getItem("auth")==="true");
  
  useEffect(()=>{
      firebaseAuth.onAuthStateChanged((userCred)=>{
          console.log(userCred)
        if(userCred){
              userCred.getIdToken().then((token)=>{
                console.log(token)
                validateUser(token).then((data)=>{
                  console.log(data);
                  dispatch({
                    type: actionType.SET_USER,
                    users:data,
                  })
                })
              })
        }else{
          setAuth(false);
          dispatch({
            type: actionType.SET_USER,
            user:data,
          })
          window.localStorage.setItem("auth", false);
          nagivate("./login");
        }
      })
  },[])
  return (
    <AnimatePresence>
                <div className='min-w-[680px] h-auto bg-primary flex justify-center items-center'>       
                  <Routes>          
                    <Route path='/Login' element={<Login setAuth={setAuth}/>} />
                    <Route  path='/*'  element={<Home/>} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                  </Routes>
                  
            </div>
            {isSongPlaying&&(
                    <motion.div
                      initial ={{opacity:0,y:50}}
                      animate ={{opacity:1,y:0}}
                      className={`fixed w-full min-w-[550] h-25 insert-x-0 border my-5 bg-primary border-textColor bg-cardOverlay  drop-shadow-2xl backdrop-blur-md flex  items-center justify-center`}
                    >
                        <MusicPlayer/>
                    </motion.div>
                  )}
    </AnimatePresence>
  
  )
}

export default App
