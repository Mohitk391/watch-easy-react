//import { useEffect, useState } from "react";
import axios from "axios";
import { useWatchLater } from "../../contexts/WatchLaterContext";
import "./videocard.css";

const VideoCard = (props) => {
    const video = props.video;
    const {watchLaterState, watchLaterDispatch } = useWatchLater();
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


    return (
        <div className="card vertical-card flex video-card flex-column">
            <div className="video-card-image pos-relative">
                <span className="card-badge top-right"><i className="fa-regular fa-heart" title="Like"></i></span>
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