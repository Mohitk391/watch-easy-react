import { createContext, useContext, useReducer } from "react";
import { PlaylistReducer } from "../reducers/PlaylistReducer";

const PlaylistContext = createContext();

const initialState = {
    playlists : [],
}
const PlaylistProvider = ({children}) => {
    const [playlistState, playlistDispatch] = useReducer(PlaylistReducer, initialState);

    return (
        <PlaylistContext.Provider value={{playlistState, playlistDispatch}}>
            {children}
        </PlaylistContext.Provider>
    );
}

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistProvider, usePlaylist };