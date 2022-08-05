import { CategoryFilter } from "../../components/Categories/CategoryFilter";
import {NavBar} from "../../components/NavBar/NavBar";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useFilter } from "../../contexts/FilterContext";
import { useVideo } from "../../contexts/VideoContext";
import "./explore.css";

const Explore = () => { 
    const {videos} = useVideo();
    const {filterState: {category}} = useFilter();
    var filteredVideos = category !== "All" ? videos.filter(video=> video.category === category) : videos;
    
    return (
        <div className="page-layout">
            <NavBar />
            <div className="video-listing-main flex">
                <CategoryFilter />
                <div className="content-section flex flex-wrap flex-gap-2">
                    {filteredVideos.map(video => {
                        return (<VideoCard video={video} type={"like"} />);
                    })}
                </div>
            </div>
        </div>
    );
}

export { Explore }