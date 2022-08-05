import { NavBar } from "../../components/NavBar/NavBar";
import "./singlevideo.css";
import { useWatchLater, useLike, useVideo, useHistory, usePlaylist } from "../../contexts";
import { Navigate, useParams } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useEffect, useState } from "react";
import { addToHistoryHandler } from "../../utils/APICallHandlers/HistoryService";
import { showToast } from "../../utils/toasts/toast";
import { getVideo } from "../../utils/APICallHandlers/VideoService";
import { addToWatchLater, deleteFromWatchLater } from "../../utils/APICallHandlers/WatchLaterService";
import { addToLikes, deleteFromLikes } from "../../utils/APICallHandlers/LikeService";
import { addNewPlaylist, addNewVideoToPlaylist, removeVideoFromPlaylist } from "../../utils/APICallHandlers/PlaylistService";

const SingleVideo = () => {
    const { videos } = useVideo();
    const params = useParams();
    const [video, setVideo] = useState([]);
    const [mustWatch, setMustWatch] = useState([]);
    const { watchLaterState:{watchLater}, watchLaterDispatch } = useWatchLater();
    const { likesState: {likes},likesDispatch } = useLike();
    const { historyState: {history}, historyDispatch } = useHistory();
    const [overlay, toggleOverlay] = useState("hidden");
    const [formInputs, setFormInputs] = useState({title:"", description: ""});
    const { playlistState:{playlists}, playlistDispatch} = usePlaylist();
    const token = localStorage.getItem("token");

    const addToHistory = async (video) => {
        if(token){
            const response = await addToHistoryHandler(video, token);
            if(response.status === 201){
                historyDispatch({type:"SET_HISTORY", payload: response.data.history});
            }
            else {
                showToast("error", "error occured");
            }
        }
    }

    useEffect(()=>{
        const getCurrentVideo = async() =>{
            const response = await getVideo(params.id);
            if(response.status === 200){
                setVideo(response.data.video);
                setMustWatch(videos.filter(currentVideo=> currentVideo.category===response.data.video.category && currentVideo._id!==response.data.video._id));
                if(!history.some(vid=> vid._id===response.data.video._id)){
                    addToHistory(response.data.video);
                }  
            }
            else{
                showToast("error", "unable to fetch video");
                Navigate("/explore");
            }
        }
        getCurrentVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params.id]);
    

    const updateWatchLater = async (video, type) => {
        const response = (type === "ADD") ? await addToWatchLater(video, token) : await deleteFromWatchLater(video, token);
        if(response.status === 201){
            watchLaterDispatch({type: "SET_WATCHLATER", payload: response.data.watchlater});
            showToast("success", "Video is added to Watch Later");
        }
        else if(response.status === 200){
            watchLaterDispatch({type: "SET_WATCHLATER", payload: response.data.watchlater});
            showToast("delete", "Video is removed from Watch Later");
        }
        else {
            showToast("error", "Something seems broken, sorry for the inconvinience");
        }
    }

    const updateLiked = async (video, type) => {
        const response = (type === "ADD") ? await addToLikes(video, token) : await deleteFromLikes(video, token);
        if(response.status === 201){
            likesDispatch({type: "SET_LIKES", payload: response.data.likes});
            showToast("success", "Video is added to Liked Videos section");
        }
        else if(response.status === 200){
            likesDispatch({type: "SET_LIKES", payload: response.data.likes});
            showToast("delete", "Video is removed from Liked Videos section");
        }
        else {
            showToast("error", "Something seems broken, sorry for the inconvinience");
        }
    }

    const updateVideoInPlaylist = async (playlist, video, type) => {
        const response = (type === "ADD") ? await addNewVideoToPlaylist(playlist._id,video,token) : await removeVideoFromPlaylist(playlist._id, video._id, token);
        if(response.status === 201){
            playlistDispatch({type: "SET_VIDEO_TO_PLAYLIST",payload: response.data.playlist});
            showToast("success", `Video is added to ${playlist.title} playlist`);
        }
        else if(response.status === 200){
            playlistDispatch({type: "SET_VIDEO_TO_PLAYLIST",payload: response.data.playlist});
            showToast("delete", `Video is removed from ${playlist.title} playlist`);
        }
        else {
            showToast("error", "Something seems broken, sorry for the inconvinience");
        }
    }

    const addToPlaylistHandler = async (e) => {
        e.preventDefault();
        if((formInputs.title.trim()).length === 0){
            showToast("error", "Name field is empty, Please fill the Name field!!")
            console.error("Title is empty");
        }
        else{
            const response = await addNewPlaylist(formInputs, token);
            if(response.status===201){
                playlistDispatch({type:"SET_PLAYLIST", payload:response.data.playlists});
                setFormInputs({title:"", description: ""});
                showToast("success", "Playlist is created successfully")
            }
            else {
                showToast("error", "Something seems broken, sorry for the inconvinience");
            }
        }
    }

    return (
        <div className="page-layout pos-relative">
        <NavBar />
        <div className="single-video-main">
            <main className="video-content flex flex-column">
                <iframe src={`https://www.youtube.com/embed/${video._id}`}
                        frameborder='0'
                        allow='autoplay; encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture'
                        allowFullScreen='true'
                        title='video'
                        width="675"
                        height="360"
                ></iframe>
                
                <div className="video-title">
                    <h2>{video.title}</h2>
                    <p className="sub-title">{video.creator}</p>
                </div>
                <div className="video-actions flex flex-space-between">
                    <div className="sub-actions flex flex-gap-1">
                        { !likes.find(lvideo=> lvideo._id === video._id)?<div className="action-details flex like" title="Like Video" onClick={()=> updateLiked(video, "ADD")}>
                            <i className="fa-solid fa-thumbs-up"></i> 
                            Like
                        </div> :
                        <div className="action-details flex dislike" title="Dislike Video" onClick={()=> updateLiked(video, "REMOVE")}>
                            <i className="fa-solid fa-thumbs-down"></i>
                            Dislike
                        </div>}
                        { !watchLater.find(lvideo=> lvideo._id === video._id) ? <div className="action-details flex watch-later" title="Add to Watch Later" onClick={()=> updateWatchLater(video, "ADD")}>
                            <i className="fa-solid fa-circle-plus"></i>
                            Add to Watch Later
                        </div> : 
                            <div className="action-details flex watch-later" title="Remove From Watch Later" onClick={()=> updateWatchLater(video, "REMOVE")}>
                            <i className="fa-solid fa-circle-minus"></i>
                            Remove From Watch Later
                        </div>
                        }
                        <div className="action-details flex video-playlist" title="Add to Playlist" onClick={()=> toggleOverlay("visible")}>
                            <i className="fa-solid fa-square-plus"></i>
                            Add to Playlist
                        </div>
                    </div>
                    <div className="sub-details">
                        <div className="h6"> {video.viewsCount} Views</div>
                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <div className="description-body">
                        {video.description}
                    </div>
                </div>
            </main>
            <aside className="videos-section">
                <h2>Must Watch</h2>
                <div className="next-videos flex flex-wrap flex-gap-1">
                    {
                        mustWatch.map(video => {
                            return (<VideoCard video={video} type={"like"} />);
                        })
                    }
                </div>
            </aside>
        </div>
        <div className="create-playlist-layer flex flex-center" style={{visibility: overlay}}>
                <div className="create-playlist flex flex-column ">
                    <div className="cp-header flex flex-space-between">
                        <h2>Create Playlist</h2>
                        <div className="close flex flex-center" onClick={()=>toggleOverlay("hidden")}><i className="fa-solid fa-close"></i></div>
                    </div>
                    <form className="flex flex-column flex-gap-1">
                        <div className="cp-content flex flex-column">
                            <label htmlFor="playlistName">Playlist Name</label>
                            <input type="text" placeholder="My Playlist" id="playlistName" value={formInputs.title} onChange={e=> setFormInputs({...formInputs, title: e.target.value})}/>
                            <label htmlFor="playlistDescription">Playlist Description</label>
                            <input type="text" placeholder="Here decription for the playlist comes" value={formInputs.description} id="playlistDescription"onChange={e=> setFormInputs({...formInputs, description: e.target.value})}/>
                        </div>
                        <div className="footer-button flex flex-center">
                            <button className="btn btn-hover create-button" onClick={e=>addToPlaylistHandler(e)}>Create</button>
                        </div>
                    </form>
                    <div className="playlist-list flex flex-column">
                    {
                        playlists.map(playlist => (
                            <div className="playlist-name">
                                <input type="checkbox" id={playlist._id}
                                    checked={playlist.videos.some((mp4) => {
                                        return mp4._id === video._id;
                                    })}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            updateVideoInPlaylist(playlist, video, "ADD");
                                        } else {
                                            updateVideoInPlaylist(playlist, video, "REMOVE");
                                        }
                                    }}
                                />
                                <label htmlFor={playlist._id}>
                                    {playlist.title}
                                </label>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
    </div>
    );
}

export { SingleVideo }