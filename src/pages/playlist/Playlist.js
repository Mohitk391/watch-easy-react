import { useState } from "react";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar";
import { usePlaylist } from "../../contexts/PlaylistContext";
import "./playlist.css";
import { Link } from "react-router-dom";

const Playlist = () => {
    const [overlay, toggleOverlay] = useState("hidden");
    const [formInputs, setFormInputs] = useState({title:"", description: ""})
    const token = localStorage.getItem("token");
    const {playlistState, playlistDispatch} = usePlaylist();
    const {playlists} = playlistState;

    const createPlaylist = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("/api/user/playlists",
                {
                    playlist : formInputs
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            playlistDispatch({type:"SET_PLAYLIST", payload:response.data.playlists});
            setFormInputs({title:"", description: ""});
        }
        catch(error){
            console.error(error);
        }  
    }

    const deletePlaylist = async (playlistId) => {
        try{
            const response = await axios.delete(`/api/user/playlists/${playlistId}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            playlistDispatch({type:"SET_PLAYLIST", payload:response.data.playlists});
        }
        catch(error){
            console.error(error);
        } 
    }
    return (
        <div className="page-layout pos-relative">
            <NavBar />
            <main className="playlist-main">
                <div className="playlist-header flex flex-space-between">
                    <h2>My Playlists</h2>
                    <button className="btn btn-hover create-playlist-button" onClick={()=>toggleOverlay("visible")}>
                        Create Playlist <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="playlist-content flex flex-wrap flex-gap-2">
                    { playlists.length>0 ? playlists.map(playlist=> {
                        return (
                        <div className="card horizontal-card playlist">
                            <Link to={`/singlePlaylist/${playlist._id}`} >
                                <div className="card-content-horizontal">
                                    <div className="card-title">{playlist.title}</div>
                                    <div className="playlist-content-details">{playlist.videos.length} videos</div>
                                </div>
                            </Link>
                            <div className="delete-playlist" onClick={()=> deletePlaylist(playlist._id)}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                        </div>
                        )}) 
                        : <div className="flex flex-column">
                            <div>You don't have any playlists.</div>
                            <div> You can create one by clicking the "CREATE PLAYLIST" button.</div>
                        </div>
                        }
                </div>
            </main>
            <div className="create-playlist-layer flex flex-center" style={{visibility: overlay}}>
                <div className="create-playlist flex flex-column ">
                    <div className="cp-header flex flex-space-between">
                        <h2>Create Playlist</h2>
                        <div className="close flex flex-center" onClick={()=>toggleOverlay("hidden")}><i className="fa-solid fa-close"></i></div>
                    </div>
                    <form className="flex flex-column flex-gap-1">
                        <div className="cp-content flex flex-column">
                            <label htmlFor="playlistName">Playlist Name</label>
                            <input type="text" placeholder="My Playlist" id="playlistName" value={formInputs.title} onChange={e=> setFormInputs({...formInputs, title: e.target.value})}/>
                            <label htmlFor="playlistDescription">Playlist Description</label>
                            <input type="text" placeholder="Here decription for the playlist comes" value={formInputs.description} id="playlistDescription"onChange={e=> setFormInputs({...formInputs, description: e.target.value})}/>
                        </div>
                        <div className="footer-button flex flex-center">
                            <button className="btn btn-hover create-button" onClick={e=>createPlaylist(e)}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { Playlist }