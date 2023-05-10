import {FaCrown}from 'react-icons/fa'
import Logo from '../Asset/img/logo.jpeg'
import React, { useState } from 'react'
// import {BiLogOut}from 'react-icons/bi'
import {motion } from 'framer-motion'
import {useNavigate, NavLink} from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import {useStateValue} from '../Context/StateProvider'
import {app} from '../configuration/firebase.configuration';
import {getAuth} from 'firebase/auth'


export const Header = () => { 
  const navigate = useNavigate();
  const [{user}, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState()
  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (    
       <header className="flex items-center w-full mb-6 md:py-2  shadow-2xl shadow-cyan-500/50   md:px-6 bg-black">
            <NavLink to={"/"}>
                    <img src={Logo} alt="logo" className='w-9' />
            </NavLink>      
            <ul className='flex items-center justify-center ml-7 text-white'>
                <li className='mx-5  text-lg' ><NavLink className={({isActive})=>isActive ? isActiveStyles:isNotActiveStyles } to={"/home" }><small className='text-white'>Home</small> </NavLink> </li>
                <li className='mx-5  text-lg' ><NavLink className={({isActive})=>isActive ? isActiveStyles:isNotActiveStyles } to={"/Music"}><small className='text-white'> Musics</small></NavLink> </li>
                <li className='mx-5  text-lg' ><NavLink className={({isActive})=>isActive ? isActiveStyles:isNotActiveStyles } to={"/premium"}><small className='text-white'>Premium</small></NavLink> </li>
                <li className='mx-5  text-lg' ><NavLink className={({isActive})=>isActive ? isActiveStyles:isNotActiveStyles } to={"/contact us"}><small className='text-white'>Contact us</small></NavLink> </li>              
            </ul>      
              <div
              onMouseEnter={() => setIsMenu(true)}
              onMouseLeave={() => setIsMenu(false)}
              className='flex  items-center ml-auto cursor-pointer gap-2 relative'>                   
                  <div className='flex flex-col'>
                      <p className='text-white text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                     <p className='flex items-center gap-2 text-gray-500 font-normal'>Premium . <FaCrown className='text-sm -ml-1 text-yellow-500'/></p>
                  </div>
                   <img src={user?.user.imageURL} className=' w-12 h-12 min-w[44px] object-cover rounded-full shadow-lg' alt="user-pic" />
                  {isMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                  className='absolute z-10 p-4 top-12 right-0 gap-4 w-275 bg-black shadow-lg rounded-lg backdrop-blur-sm flex-col'>

                        <NavLink>
                              <p className='text-base textColor hover:font-semibold duration-150 transition-all ease-in-out'>
                                    Profile
                              </p>
                        </NavLink>
                         
                          <p className='text-base textColor hover:font-semibold duration-150 transition-all ease-in-out'>
                                  Favourite
                          </p>
                          <hr />  
                          
                          
                                  <NavLink  to={'/dashboard/home'}>
                                    <p className='text-base textColor hover:font-semibold duration-150 transition-all ease-in-out'>
                                          Admin Dashbroad
                                   </p>
                              </NavLink>                              
                            
                          
                          
                          
                          <hr />
                          <p className='text-base textColor hover:font-semibold duration-150 flex  align-middle transition-all ease-in-out'     onClick={logout}>
                              log Out
                          </p>
                  </motion.div>
                          )}
              </div>
       </header>
   
  )


  }