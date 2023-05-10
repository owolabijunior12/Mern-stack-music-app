/* eslint-disable no-undef */
import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Header } from './Header'
import {IoHome} from 'react-icons/io5'
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import {BiUser} from 'react-icons/bi'
import {SiApplemusic} from 'react-icons/si'
import {MdLibraryMusic} from 'react-icons/md'
import {ImUserTie}from 'react-icons/im'
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashboardHome from "./DashboardHome";
import DashboardMusics from "./DashboardMusics";
import DashboardUser from "./DashboardUser";
import DashboardNewMusic  from "./DashboardNewMusic";




const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
    <Header />      
    <div className="w-[60%]  p-1 flex items-center justify-evenly text-white">    
      <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }><IoHome className=" text-textColor m-1" /><small className='text-white'>Home</small> </NavLink>    
      <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }><BiUser className='m-1 text-center ' /> <small className='text-white'>Users</small> </NavLink>
      <NavLink to={"/dashboard/music"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }><SiApplemusic className='m-1 text-center ' /><small className='text-white'>Music</small>  </NavLink>
      <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }><ImUserTie className='m-1 text-center ' /><small className='text-white'>Artist </small> </NavLink>  
      <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }><MdLibraryMusic/><small className='text-white'>Albums</small>  </NavLink>
    </div>
    <div className="my-4 w-full p-4">
      <Routes>
        <Route path="/home" element={<DashboardHome />} />
        <Route path="/user" element={<DashboardUser />} />
        <Route path="/music" element={<DashboardMusics />} />
        <Route path="/artist" element={<DashboardArtist />} />
        <Route path="/albums" element={<DashboardAlbum />} />
        <Route path="/newSong" element={<DashboardNewMusic/>} />
      </Routes>
    </div>
  </div>
  )
}

export default Dashboard
