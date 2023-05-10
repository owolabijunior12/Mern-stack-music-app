import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoTrash } from "react-icons/io5";
import {
    deleteArtist,
    deleteMusic,
    deleteAlbum,
    getAllAlbums,
    getAllArtists,
    getAllMusics
} from '../api';
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';
import { storage } from '../configuration/firebase.configuration';
import { deleteObject, ref } from 'firebase/storage';


const MusicCard = ({ data, index, type }) => {
  const [{ alertType, allAlbums, allArtists, allMusics, musicIndex, isSongPlaying }, dispatch] = useStateValue()
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteData = () => {
    console.log(data);
    // delete music
    const deleteRef = ref(storage, data.imageURL);
    deleteObject(deleteRef).then(() => {
      deleteMusic(data._id).then((res) => {
        if (res.data) {
          getAllMusics().then((data) => {
            console.log(data.music)
            dispatch({
              type: actionType.SET_MUSICS,
              musics: data.music,
            })
          })
        }
      })
    })
    // delete artist
    deleteArtist(data._id).then((res) => {
      if (res.data) {
        getAllArtists().then((data) => {
          console.log(data.music)
          dispatch({
            type: actionType.SET_ARTISTS,
            artists: data.artists,
          })
        })
      }
    })
    // delete album
    deleteAlbum(data._id).then((res) => {
      if (res.data) {
        getAllAlbums().then((data) => {
          console.log(data.albums)
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.albums,
          })
        })
      }
    })
  }

  const addToContext = () => {
    console.log(type);
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true
      })
    }

    if (musicIndex !== index) {
      dispatch({
        type: actionType.SET_MUSICS_INDEX,
        musicIndex: index
      })
    }
  }

  return (
  <motion.div className='relative w-40 min-w-210 px-2 cursor-pointer hover:bg-card bg-yellow-100 shadow-md flex flex-col items-center py-3 rounded-xl' 
    onClick={ type === "music" && addToContext}
  >
        <div  className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageURL}
                alt=""
                className=" w-full h-full rounded-lg object-cover"
            />
        </div>
        <p className="text-base text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 14)}...` : data.name}
        <span className="block text-sm text-gray-400 my-1">
          {data.artist.length}
          </span>
      </p> 
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
          <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" />
        </motion.i>
      </div>
      
      {isDeleted && (
        <motion.div
          className='absolute insert-0 backdrop-blur-md bg-slate-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0'
          instial ={{opacity:0}}
          animate ={{opacity:1}}
        >
          <p className='text-lg text-text-color font-semibold text-center'>
            Are you sure you want to delete this 
          </p>
          <div className='flex items-center gap-4'>
              <motion.button 
                className='px-2 py-1 text-sm uppercase bg-primary rounded-md hover:red-500 cursor-pointer'
                whileTap={{scale:0.7}}
                onClick={()=>{
                  deleteData()
                }}
              >
                Yes
              </motion.button>
              <motion.button
                className='px-2 py-1 text-sm uppercase bg-primary rounded-md hover:red-500 cursor-pointer'
                whileTap={{scale:0.7}}
                onClick={()=>{
                  setIsDeleted(false);
                }}
              >

              </motion.button>
          </div>




        </motion.div>
      )}

  </motion.div>
  )
} 

export default MusicCard
