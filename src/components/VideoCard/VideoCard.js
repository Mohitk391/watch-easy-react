import { useWatchLater } from "../../contexts/WatchLaterContext";
import { useLike } from "../../contexts/LikeContext";
import "./videocard.css";
import { useHistory, usePlaylist } from "../../contexts";
import { Link } from "react-router-dom";
import { removeFromHistoryHandler } from "../../utils/APICallHandlers/HistoryService";
import { showToast } from "../../utils/toasts/toast";
import { addToWatchLater, deleteFromWatchLater } from "../../utils/APICallHandlers/WatchLaterService";
import { addToLikes, deleteFromLikes } from "../../utils/APICallHandlers/LikeService";
import { removeVideoFromPlaylist } from "../../utils/APICallHandlers/PlaylistService";

const VideoCard = (props) => {
    const video = props.video;
    const type = props.type;
    const playlist = props.playlist;
    const {watchLaterState, watchLaterDispatch } = useWatchLater();
    const { watchLater } = watchLaterState;
    const {likesState, likesDispatch} = useLike();
    const { likes } = likesState;
    const token = localStorage.getItem("token");
    const { historyDispatch } = useHistory();
    const {playlistDispatch} = usePlaylist();

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

    const removeFromPlaylist = async (video, playlist) => {
        const response = await removeVideoFromPlaylist(playlist._id, video._id, token);
        if(response.status === 200){
            playlistDispatch({type: "SET_VIDEO_TO_PLAYLIST",payload: response.data.playlist});
            showToast("delete", `Video is removed from ${playlist.title} playlist`);
        }
        else {
            showToast("error", "Something seems broken, sorry for the inconvinience");
        }
    }

    const removeFromHistory = async (video) => {
        const response = await removeFromHistoryHandler(video,token);
        if(response.status === 200){
            historyDispatch({type: "SET_HISTORY", payload: response.data.history});
            showToast("success", "Video removed from history successfully!!!");
        }
        else {
            showToast("error","Some error occured, Sorry for the inconvenience!!");
            console.log(response.data.message);
        }
    }

    return (
            <div className="card vertical-card flex video-card flex-column pos-relative">
                <div className="video-card-image pos-relative">
                    <Link to={`/watch/${video._id}`} >
                        <img src={`https://img.youtube.com/vi/${video._id}/hqdefault.jpg`} alt={video.title}/>
                    </Link>
                    <span className="video-card-timer bottom-right">{video.time}</span>
                </div>
                {type==="like" ?    
                    <span className="card-badge top-right">
                    { !likes.find(lvideo=> lvideo._id === video._id) ? <i className="fa-regular fa-heart"  title="Like" onClick={()=>updateLiked(video,"ADD")}></i>
                        : <i className="fa-solid fa-heart" style={{color: "red"}} title="DisLike" onClick={()=>updateLiked(video,"REMOVE")}></i>
                    }
                    </span> :
                    <span className="card-badge top-right">
                        { type !== "deleteFromPlaylist" ?
                        <i class="fa-solid fa-trash-can" onClick={()=>removeFromHistory(video)}></i>
                        : <i class="fa-solid fa-trash-can" onClick={()=>removeFromPlaylist(video, playlist)}></i>
                    }
                    </span>
                }
                <div className="card-title">{video.title}</div>
                <p className="sub-title">{video.creator}</p>
                <div className="h6"> {video.viewsCount} Views </div>
                { !watchLater.find(wlvideo => wlvideo._id === video._id) ? <button className="btn btn-hover add-to-cart-button watchlaterbtn" onClick={()=>{ updateWatchLater(video, "ADD")}}>Watch Later</button>
                    : <button className="btn btn-hover remove-from-wishlist-button watchlaterbtn" onClick={()=>{ updateWatchLater(video, "REMOVE")}}>Remove From Watch Later</button>
                }
            </div>
    );
}


export { VideoCard }