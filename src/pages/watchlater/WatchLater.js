import { NavBar } from "../../components/NavBar/NavBar";
import "./watchlater.css";
import { useWatchLater } from "../../contexts/WatchLaterContext";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { Link } from "react-router-dom";

const WatchLater = () => {
    const watchLaterState  = useWatchLater();
    const { watchLater } = watchLaterState;
    return (
        <div class="page-layout">
        <NavBar />
        <main class="watch-later-main">
            <div class="watch-later-header">
                <h2>Watch Later</h2>
            </div>
            <div class="watch-later-content flex flex-wrap flex-gap-1">
                { watchLater ? (
                    watchLater.map( video => {
                    return (
                        <VideoCard video={video} />
                    ) 
                })
                ) : (
                    <div className="flex flex-center">
                        <div>You don't have any video in Watch Later section</div>
                        <div>Check out <Link to="/explore">Explore </Link> to add videos in Watch Later</div>
                    </div>
                )}
            </div>
        </main>
    </div>
    );
}

export { WatchLater }