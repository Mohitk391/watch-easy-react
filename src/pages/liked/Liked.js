import { NavBar } from "../../components/NavBar/NavBar";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { Link } from "react-router-dom";
import "./liked.css";
import { useLike } from "../../contexts/LikeContext";

const Liked = () => {
    const {likesState} = useLike();
    const { likes } = likesState;
    return (
        <div class="page-layout">
        <NavBar />
        <main class="liked-main">
            <div class="liked-header">
                <h2>Liked Videos</h2>
            </div>
            <div class="liked-content flex flex-wrap flex-gap-1">
                { likes ? (
                    likes.map( video => {
                    return (
                        <VideoCard video={video} />
                    ) 
                })
                ) : (
                    <div className="flex flex-column flex-center">
                        <div>You don't have any video in Liked Videos section</div>
                        <div>Check out <Link to="/explore">Explore </Link> to add videos in Liked Videos</div>
                    </div>
                )}
            </div>
        </main>
    </div>
    );
}

export { Liked };