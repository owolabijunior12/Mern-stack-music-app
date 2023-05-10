import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi';
import { RiUserStarFill } from 'react-icons/ri';
import { useStateValue } from '../Context/StateProvider'; 
import { getAllAlbums, getAllArtists,getAllMusics, getAllSongs, getAllUser } from '../api/index';
import { actionType } from '../Context/reducer';

export const DashboardCards = ({ icon, name, count }) => {
  return (
    <div className="p-4 gap-3 h-auto rounded-lg shadow-md bg-textColor text-white">
      {icon}
      <p className='text-xl text-white font-bold'>{name}</p>
      <p className='text-xl text-white'>{count}</p>
    </div>
  );
};

const About = () => {
  const [{ allUsers, allSongs, allAlbums, allArtists,allMusics }, dispatch] = useStateValue();

  useEffect(() => {
    getAllUser().then((data) => {
      dispatch({
        type: actionType.SET_ALL_USERS,
        allUsers: data.users
      });
      console.log(data.users);
    });

    getAllAlbums().then((data) => {
      dispatch({
        type: actionType.SET_ALL_ALBUMS,
        allAlbums: data.albums,
      });
    });

    getAllArtists().then((data) => {
      dispatch({
        type: actionType.SET_ARTISTS,
        artists: data.artists,
      });
    });
    getAllMusics().then((data) => {
      dispatch({
        type: actionType.SET_MUSICS,
        musics: data.music,
      });
      console.log(data.music);
    });

  }, []);

  return (
    <div className="w-full snap-mandatory p-6 flex items-center  text-black justify-evenly flex-wrap">      
      <DashboardCards icon={<FaUsers className="text-3xl" />} name="Users" count={allUsers?.length ?? 0} />    
      <DashboardCards icon={<RiUserStarFill className="text-3xl" />} name="Music" count={allMusics?.length ?? 0} />
      <DashboardCards icon={<RiUserStarFill className="text-3xl" />} name="Artists" count={allArtists?.length ?? 0} />
      <DashboardCards icon={<GiMusicalNotes className="text-3xl" />} name="Albums" count={allAlbums?.length ?? 0} />                    

      <p>
          This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to share and stream their favorite audio files. Users can create playlists, upload audio files, and explore other users’ collections.
          <br />
          <h1 className='text-textColor font-' >Features </h1>
          <ul className='text-textColor'>
              <li> User authentication and authorization using JWT tokens.</li>
              <li> User registration and login.</li>
              <li>User profile page to manage uploaded audio files and</li>
              <li> Audio file upload with support for multiple file formats.</li>
              <li> Audio streaming with player controls (play, pause, skip, etc.).</li>
          </ul>                                                      
      </p>
    </div>
  );
};

export default About;
