import { createContext, useContext, useEffect, useState } from "react";
import { getAllVideos } from "../utils/APICallHandlers/VideoService";
import { showToast } from "../utils/toasts/toast";
const VideoContext = createContext();

const VideoProvider = ({children}) => {
    const [videos, setVideos] = useState([]);
    useEffect (()=>{
        const fetchVideos = async () => {
            const response = await getAllVideos();

            if(response.status === 200){
                setVideos(response.data.videos);
            }
            else {
                showToast("error", "Some error occured, Sorry for the inconvenience!!");
                console.log(response.data.message);
            }
        }
        fetchVideos();
    },[]);
    return (<VideoContext.Provider value={{videos}}>
        {children}
    </VideoContext.Provider>);
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo};