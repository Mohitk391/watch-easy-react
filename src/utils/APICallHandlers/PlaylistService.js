import axios from "axios";

export const addNewVideoToPlaylist = async (playlistId, video, token) => {
    try {
        const response =await axios.post(`/api/user/playlists/${playlistId}`,
        {
            video
        },
        {
            headers: {
                authorization: token
            },
        }
        );
        return response;
    }
    catch(error){
        console.error(error);
        return error.response;
    }
}

export const removeVideoFromPlaylist = async (playlistId, videoId, token) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`,
        {
            headers: {
                authorization: token
            },
        }
        );
        return response;
    }
    catch(error){
        console.error(error);
        return error.response;
    }
}

export const addNewPlaylist = async (playlistDetails, token) => {
    try{
        const response = await axios.post("/api/user/playlists",
            {
                playlist : playlistDetails
            },
            {
                headers: {
                    authorization: token
                }
            }
        );
        return response;
    }
    catch(error){
        console.error(error);
        return error.response;
    }  
}

export const deletePlaylist = async (playlistId, token) => {
    try{
        const response = await axios.delete(`/api/user/playlists/${playlistId}`,
            {
                headers: {
                    authorization: token
                }
            }
        );
        return response;
    }
    catch(error){
        console.error(error);
        return error.response;
    } 
}