import {NavBar} from "../../components/NavBar/NavBar";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useVideo } from "../../contexts/VideoContext";
import "./explore.css";

const Explore = () => { 
    const {videos} = useVideo();
    return (
        <div className="page-layout">
            <NavBar />
            <div className="video-listing-main flex">
                <aside className="menu">
                    <div className="category-menu">
                        <div className="title">Category</div>
                        <ul className="list-none">
                            <li className="menu-item">
                                <button className="bt btn-hover category-button">Sports</button>
                            </li>
                            <li className="menu-item">
                                <button className="bt btn-hover category-button">News</button>
                            </li>
                            <li className="menu-item">
                                <button className="bt btn-hover category-button">Music</button>
                            </li>
                            <li className="menu-item">
                                <button className="bt btn-hover category-button">Gaming</button>
                            </li>
                            <li className="menu-item">
                                <button className="bt btn-hover category-button">Sci-fi</button>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="content-section flex flex-wrap flex-gap-2">
                    {videos.map(video => {
                        return (<VideoCard video={video} />);
                    })}
                </div>
            </div>
        </div>
    );
}

export { Explore }