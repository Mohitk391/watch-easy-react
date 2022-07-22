import { Link, useParams } from "react-router-dom"
import { NavBar } from "../../components/NavBar/NavBar"
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { usePlaylist } from "../../contexts"

const SinglePlaylist = () => {
    const {playlistState} = usePlaylist();
    const params = useParams();
    const playlist = playlistState.playlists.find(current => current._id === params.id);

    return ( 
    <div class="page-layout">
    <NavBar />
    <main class="playlist-main">
        <div class="playlist-header flex flex-space-between">
            <h2>{playlist.title}</h2>
        </div>
        <div class="playlist-content flex flex-wrap flex-gap-1">
        { playlist.videos.length>0 ? (
                playlist.videos.map( video => {
                return (
                    <VideoCard video={video} type={"deleteFromPlaylist"} playlist={playlist}/>
                ) 
            })
            ) : (
                <div className="flex flex-center flex-column">
                    <div>You don't have any video in {playlist.title}.</div>
                    <div>Check out <Link to="/explore">Explore</Link>.</div>
                </div>
            )}
        </div>
    </main>
</div>
)
}

export { SinglePlaylist }