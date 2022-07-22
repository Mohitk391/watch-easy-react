//import { useEffect, useState } from "react";
import axios from "axios";
import { useWatchLater } from "../../contexts/WatchLaterContext";
import { useLike } from "../../contexts/LikeContext";
import "./videocard.css";
import { useHistory } from "../../contexts";

const VideoCard = (props) => {
    const video = props.video;
    const type = props.type;
    const {watchLaterState, watchLaterDispatch } = useWatchLater();
    const { watchLater } = watchLaterState;
    const {likesState, likesDispatch} = useLike();
    const { likes } = likesState;
    const token = localStorage.getItem("token");
    const { historyDispatch } = useHistory();

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

    const removeFromHistory = async (video) => {
        try{
            const response = axios.delete(`/api/user/history/${video._id}`,
                {
                    headers:{
                        authorization: token
                    }
                }
            )
            historyDispatch({type: "SET_HISTORY", history: (await response).data.history});
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <div className="card vertical-card flex video-card flex-column">
            <div className="video-card-image pos-relative">
                {type==="like" ?    <span className="card-badge top-right">
                    { !likes.find(lvideo=> lvideo._id === video._id) ? <i className="fa-regular fa-heart" title="Like" onClick={()=>updateLiked(video,"ADD")}></i>
                        : <i className="fa-solid fa-heart" title="DisLike" onClick={()=>updateLiked(video,"REMOVE")}></i>
                    }
                </span> :
                    <span className="card-badge top-right">
                        <i class="fa-solid fa-trash-can" onClick={()=>removeFromHistory(video)}></i>
                </span>
                }
                <img src={video.poster} alt={video.title}/>
                <span className="video-card-timer bottom-right">{video.time}</span>
            </div>
            <div className="card-title">{video.title}</div>
            <p className="sub-title">{video.creator}</p>
            <div className="h6"> {video.viewsCount} Views &#8226;  4 months ago</div>
            { !watchLater.find(wlvideo => wlvideo._id === video._id) ? <button className="btn btn-hover add-to-cart-button watchlaterbtn" onClick={()=>{ updateWatchLater(video, "ADD")}}>Watch Later</button>
                : <button className="btn btn-hover remove-from-wishlist-button watchlaterbtn" onClick={()=>{ updateWatchLater(video, "REMOVE")}}>Remove From Watch Later</button>
            }
        </div>
    );
}


export { VideoCard }