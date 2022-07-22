
const PlaylistReducer = (playlistState, action) => {
    switch(action.type){
        case "SET_PLAYLIST":
            return {...playlistState, playlists: action.payload};
        case "SET_VIDEO_TO_PLAYLIST":
            return {...playlistState, playlists: setVideoInPlaylist(playlistState.playlists, action.payload) };
        default: 
            return playlistState;
    }
}

const setVideoInPlaylist = (playlists, playlist) => {
        playlists =  playlists.map((currentPlaylist) => 
                currentPlaylist._id === playlist._id?
                {...currentPlaylist,  videos: playlist.videos} :
                currentPlaylist
                );
        return playlists;
}

export { PlaylistReducer }