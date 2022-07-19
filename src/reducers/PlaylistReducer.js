
const PlaylistReducer = (playlistState, action) => {
    switch(action.type){
        case "SET_PLAYLIST":
            return {...playlistState, playlists: action.payload};
        default: 
            return playlistState;
    }
}

export { PlaylistReducer }