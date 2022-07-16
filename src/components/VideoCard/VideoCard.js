//import { useEffect, useState } from "react";
import "./videocard.css";

/*const calculateUploadTime = (videoTime) => {
    var currentTime = new Date();

    var uploadTime = currentTime.getTime() - videoTime.getTime() / (1000) ;
    if (uploadTime > 2628288 ){
        uploadTime = Math.floor(uploadTime/(60*60*24*30));
        uploadTime = `${uploadTime} months`;
    }
    else if(uploadTime > 86400){
        uploadTime = Math.floor(uploadTime/(60*60*24));
        uploadTime = `${uploadTime} days`;
    }
    else if(uploadTime > 3600){
        uploadTime = Math.floor(uploadTime/(60*60));
        uploadTime = `${uploadTime} hours`;
    }
    else if(uploadTime > 60){
        uploadTime = Math.floor(uploadTime/(60));
        uploadTime = `${uploadTime} minutes`;
    }
    else {
        uploadTime = `${uploadTime} seconds`;
    }
    return uploadTime;
}*/

const VideoCard = (props) => {
    const video = props.video;
    //const [uploadedTime , setUploadedTime] = useState(video.uploadTime);

    /* useEffect (() => {
    //     setUploadedTime(calculateUploadTime(uploadedTime));
    // },[]);*/

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
            <button className="btn btn-hover add-to-cart-button watchlaterbtn">Watch Later</button>
        </div>
    );
}


export { VideoCard }