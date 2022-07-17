import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const VideoContext = createContext();

const VideoProvider = ({children}) => {
    const [videos, setVideos] = useState([]);
    useEffect (()=>{
        const fetchVideos = async () => {
            try {
                const response = await axios.get("/api/videos");
                setVideos(response.data.videos);
            }
            catch(error){
                console.error(error);
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