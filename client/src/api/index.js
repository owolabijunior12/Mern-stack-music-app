import axios from "axios";

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/user/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artist/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const getAllMusics = async () => {
  try {
    const res = await axios.get(`${baseURL}api/music/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};


export const getAllUser = async () => {
  try {
    const res = await axios.get(`${baseURL}api/user/getUser`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/user/delete/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/song/getAll`);
    return res.data; 
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/album/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changeUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/user/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artist/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};
export const saveNewMusic = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/music/save`, { ...data });
    return (await res).data.music;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/album/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

// export const saveNewMusic = async (data) => {
//   try {
//     const res = axios.post(`${baseURL}api/music/save`, { ...data });
//     return (await res).data.music;
//   } catch (error) {
//     return null;
//   }
// };

export const deleteMusic= async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/music/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
export const deleteAlbum= async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/album/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
export const deleteArtist= async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/artist/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
// export changeUserRole