import axios from "axios";


export const addToLikes = async (video, token) => {
    try {
        const response = await axios.post("/api/user/likes",
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

export const deleteFromLikes = async (video, token) => {
    try {
        const response = await axios.delete(`/api/user/likes/${video._id}`,
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