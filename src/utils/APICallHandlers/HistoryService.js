import axios from "axios";


export const addToHistoryHandler = async (video, token) => {
    try{
        const response = await axios.post("/api/user/history",
        {
            video
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

export const removeFromHistoryHandler = async (video,token) => {
    try{
        const response = await axios.delete(`/api/user/history/${video._id}`,
            {
                headers:{
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

export const clearHistoryHandler = async (token) => {
    try {
        const response = await axios.delete("/api/user/history/all",
            {
                headers : {
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