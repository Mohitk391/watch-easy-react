//import { useEffect, useState } from "react";
import axios from "axios";
import { useWatchLater } from "../../contexts/WatchLaterContext";
import { useLike } from "../../contexts/LikeContext";
import "./videocard.css";

const VideoCard = (props) => {
    const video = props.video;
    const {watchLaterState, watchLaterDispatch } = useWatchLater();
    const {likesState, likesDispatch} = useLike();
    const { likes } = likesState;
    const token = localStorage.getItem("token");
    const { watchLater } = watchLaterState;

    const updateWatchLater = async ( video, type) => {
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
        ) : axios.delete(`/api/user/watchlater/${video._id}`,
            {
                headers: {
                    authorization: token
                },
            }
        );
        watchLaterDispatch("SET_WATCHLATER", response.data.watchlater);
        }
        catch(error){
            console.error(error);
        }
    }

    const updateLiked = async ( video, type) => {
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
        ) : axios.delete(`/api/user/likes/${video._id}`,
            {
                headers: {
                    authorization: token
                },
            }
        );
        likesDispatch("SET_LIKES", response.data.likes);
        }
        catch(error){
            console.error(error);
        }
    }


    return (
        <div className="card vertical-card flex video-card flex-column">
            <div className="video-card-image pos-relative">
                <span className="card-badge top-right">
                    { !likes.find(lvideo=> lvideo._id === video._id) ? <i className="fa-regular fa-heart" title="Like" onClick={()=>updateLiked(video,"ADD")}></i>
                        : <i className="fa-solid fa-heart" title="DisLike" onClick={()=>updateLiked(video,"REMOVE")}></i>
                    }
                </span>
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