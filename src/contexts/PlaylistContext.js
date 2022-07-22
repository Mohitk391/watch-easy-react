import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { PlaylistReducer } from "../reducers/PlaylistReducer";

const PlaylistContext = createContext();

const initialState = {
    playlists : [],
}
const PlaylistProvider = ({children}) => {
    const [playlistState, playlistDispatch] = useReducer(PlaylistReducer, initialState);
    const token = localStorage.getItem("token");
    useEffect(()=>{
        const fetchPlaylist = async ()=>{
            try{
                const response = await axios.get("/api/user/playlists",
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );
                playlistDispatch("SET_PLAYLIST", response.data.playlists);
            }
            catch(error){
                console.error(error);
            }
        };
        fetchPlaylist();
    },[token]);
    return (
        <PlaylistContext.Provider value={{playlistState, playlistDispatch}}>
            {children}
        </PlaylistContext.Provider>
    );
}

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistProvider, usePlaylist };