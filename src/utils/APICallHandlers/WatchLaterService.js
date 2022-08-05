import axios from "axios";

export const addToWatchLater = async (video, token) => {
    try {
        const response = await axios.post("/api/user/watchlater",
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

export const deleteFromWatchLater = async (video, token) => {
    try {
        const response = await axios.delete(`/api/user/watchlater/${video._id}`,
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