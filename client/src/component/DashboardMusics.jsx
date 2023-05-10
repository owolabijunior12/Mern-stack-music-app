import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { IoAdd,IoPause,IoPlay,IoTrash } from 'react-icons/io5'
import { motion } from "framer-motion";
import MusicCard from "./MusicCard"
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from '../Context/StateProvider';
import { getAllMusics } from '../api';
import { actionType } from '../Context/reducer';



const DashboardMusics = () => {
 const [songFilter,setSongFilter] = useState("");
 const [isFocus, setIsFocus] = useState(false);
 const [filteredSongs, setFilteredSongs] = useState(null);
 const [{ allMusics }, dispatch] = useStateValue();

 useEffect(() => {
  if (!allMusics) {
    getAllMusics().then((data) => {
      dispatch({
        type: actionType.SET_MUSICS,
        allSongs: data.music,
      });
      console.log(data.music);
    });
  }
}, []);





  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink to={"/dashboard/newSong"} className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer" >
          <IoAdd />
        </NavLink>
        <input type="text"
          className={`w-80 px-4 py-2 border ${
            isFocus ? "border-purple-800 shadow-md" : "border-gray-300"} rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text base text-textColor font-semibold`}
          value={songFilter}
         placeholder='Search music...'         
         onChange={(e) => setSongFilter(e.target.value)}
         onBlur={() => setIsFocus(false)}
         onFocus={() => setIsFocus(true)}
         />
          <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </i>
      </div>
    {/* main container */}
    <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
       {/* count */}

        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-bold text-textColor">Count : </span>
            { allMusics?.length}
          </p>
        </div>
            <SongContainer data={allMusics}/>
      </div>
    </div>    
   )
}

export default DashboardMusics
export const SongContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((music, i) => (
          <MusicCard   key={music._id} data={music} index={i} />
        ))}
    </div> 
  );
};
