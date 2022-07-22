import axios from "axios";
import { useWatchLater } from "../../contexts/WatchLaterContext";
import { useLike } from "../../contexts/LikeContext";
import "./videocard.css";
import { useHistory, usePlaylist } from "../../contexts";
import { Link } from "react-router-dom";

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
        try {
            const response = (type === "ADD") ? await axios.post("/api/user/watchlater",
            {
                video
            },
            {
                headers: {
                    authorization: token
                },
            }
        ) : await axios.delete(`/api/user/watchlater/${video._id}`,
            {
                headers: {
                    authorization: token
                },
            }
        );
        watchLaterDispatch({type: "SET_WATCHLATER", payload: response.data.watchlater});
        }
        catch(error){
            console.error(error);
        }
    }

    const updateLiked = async (video, type) => {
        try {
            const response = (type === "ADD") ? await axios.post("/api/user/likes",
            {
                video
            },
            {
                headers: {
                    authorization: token
                },
            }
        ) : await axios.delete(`/api/user/likes/${video._id}`,
            {
                headers: {
                    authorization: token
                },
            }
        );
        likesDispatch({type: "SET_LIKES",payload: response.data.likes});
        }
        catch(error){
            console.error(error);
        }
    }

    const removeFromPlaylist = async (video, playlist) => {
        try{
            const response = await axios.delete(`/api/user/playlists/${playlist._id}/${video._id}`,
                {
                    headers:{
                        authorization: token
                    }
                }
            )
            playlistDispatch({type: "SET_VIDEO_TO_PLAYLIST",payload: response.data.playlist});
        }
        catch(error){
            console.error(error);
        }
    }

    const removeFromHistory = async (video) => {
        try{
            const response = await axios.delete(`/api/user/history/${video._id}`,
                {
                    headers:{
                        authorization: token
                    }
                }
            )
            historyDispatch({type: "SET_HISTORY", payload: response.data.history});
        }
        catch(error){
            console.error(error);
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