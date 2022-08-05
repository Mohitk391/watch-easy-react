import axios from "axios";


export const getVideo = async (videoId) => {
    try {
        const response = await axios.get(`/api/video/${videoId}`);
        return response;
    }
    catch(error){
        return error.response;
    }
}

export const getAllVideos = async () => {
    try {
        const response = await axios.get("/api/videos");
        return response;
    }
    catch(error){
        return error.response;
    }
}
