import { createContext, useContext, useEffect, useState } from "react";
import {tempVideos} from "../data/temp-data";
const VideoContext = createContext();

const VideoProvider = ({children}) => {
    const [videos, setVideos] = useState([]);
    useEffect (()=>{
        setVideos(tempVideos);
    },[]);
    return (<VideoContext.Provider value={{videos}}>
        {children}
    </VideoContext.Provider>);
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo};