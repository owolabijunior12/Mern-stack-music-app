import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllMusics } from "../api";
import { RiPlayListFill } from "react-icons/ri";

const MusicPlayer = () => {
  const [{allMusics , musics , isSongPlaying, musicIndex, miniPlayer},dispatch]=useStateValue()
  const [isPlayList, setIsPlayList] = useState(false);

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };
  const nextTrack = () => {
    if (musicIndex >= allMusics.length - 1) {
      dispatch({
        type: actionType.SET_SONG,
        musicIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        musicIndex: musicIndex + 1,
      });
    }
  };
  
  
  const previousTrack = () => {
    if (musicIndex === 0) {
      dispatch({
        type: actionType.SET_SONG,
        musicIndex: allMusics.length - 1,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        musicIndex: musicIndex - 1,
      });
    }
  };
  

  useEffect(() => {
    if (musics > allMusics.length) {
      dispatch({
        type: actionType.SET_MUSICS,
        musics: 0,
      });
    }
  }, [ ]);

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
    <div
      className={`w-full full items-center gap-3 p-4 ${
        miniPlayer ? "absolute top-40" : "flex relative"
      }`}
    >
      <img
        src={allMusics[musicIndex]?.imageURL}
        className="w-40 h-20 object-cover rounded-md"
        alt=""
      />
      <div className="flex items-start flex-col">
        <p className="text-xl text-headingColor font-semibold">
          {`${
            allMusics[musicIndex]?.name.length > 20
              ? allMusics[musicIndex]?.name.slice(0, 20)
              : allMusics[musicIndex]?.name
          }`}{" "}
          <span className="text-base">({allMusics[musicIndex]?.album})</span>
        </p>
        <p className="text-textColor">
          {allMusics[musicIndex]?.artist}{" "}
          <span className="text-sm text-textColor font-semibold">
            ({allMusics[musicIndex]?.category})
          </span>
        </p>
        <motion.i
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsPlayList(!isPlayList)}
        >
          <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
        </motion.i>
      </div>
      <div className="flex-1">
        <AudioPlayer
          src={allMusics[musicIndex]?.songUrl}
          onPlay={() => console.log("is playing")}
          autoPlay={true}
          showSkipControls={true}
          onClickNext={nextTrack}
          onClickPrevious={previousTrack}
        />
      </div>
      <div className="h-full flex items-center justify-center flex-col gap-3">
        <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
          <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" values="close player"/>
        </motion.i>
        <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
          <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" values="share" />
        </motion.i>
      </div>
    </div>

    {isPlayList && (
      <>
        <PlayListCard />
      </>
    )}

    {miniPlayer && (
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed right-2 bottom-2 "
      >
        <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
          <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
          <img
            onClick={togglePlayer}
            src={allMusics[musicIndex]?.imageURL}
            className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
            alt=""
          />
          IoMusicalNote
        </div>
      </motion.div>
    )}
  </div>
  )
}

export const PlayListCard = () => {
  const [{ allMusics, musics, isSongPlaying }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allMusics) {
      getAllMusics().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allMusics: data.data,
        });
      });
    }
  }, []);

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (musics!== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        allMusics:musics
      });
    }
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {allMusics.length > 0 ? (
        allMusics.map((musics, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
              musics?._id ===musics._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  musics?.name.length > 20
                    ? musics?.name.slice(0, 20)
                    : musics?.name
                }`}{" "}
                <span className="text-base">({musics?.album})</span>
              </p>
              <p className="text-textColor">
                {musics?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({musics?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer
