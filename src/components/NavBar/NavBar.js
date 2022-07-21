import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../contexts";

const NavBar = () => {
    const { userState,userDispatch } = useUser();
    const [toggleMenu, setToggleMenu] = useState(false);
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.clear();
        userDispatch({type:"UNSET_USER"}); 
        navigate("/login");
    }

    return (
    <nav className="navbar-2">
        <Link to="/" className="logo">WATCH EASY</Link>
        <div className="navbar-search">
            <input className="navbar-searchbar" type="text" placeholder="Search for a video..."/>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="navbar-links flex flex-space-evenly">
            { !userState.isUserLoggedIn ? <Link to="/login"><button className="btn btn-hover sign-in">Login <i className="fa-solid fa-arrow-right"></i></button></Link> :
            <button className="btn btn-hover sign-in" onClick = {()=>{logoutUser()}}>Logout</button>
            }
            <Link to="/"><i className="fa-solid fa-video" title="Upload Video"></i></Link>
            <Link to="/explore"><i className="fa-solid fa-compass" title="Explore Videos"></i></Link>
            <div className="menu-dropdown">
                <i className="fa-solid fa-user dropbtn" onClick={()=>{ setToggleMenu(!toggleMenu)}}></i>
                { userState.isUserLoggedIn ? 
                <div className="dropdown-content" style={{display: toggleMenu ? "block" : "none"}}>
                    <Link to="/profile"><i className="fa-solid fa-user"></i> My Profile</Link>
                    <Link to="/playlist"><i className="fa-solid fa-layer-group"></i> My Playlists</Link>
                    <Link to="/watchlater"><i className="fa-solid fa-clock"></i> Watch Later</Link>
                    <Link to="/liked"><i className="fa-solid fa-thumbs-up"></i> Liked Videos</Link>
                    <Link to="/history"><i className="fa-solid fa-clock-rotate-left"></i> History</Link>
                    <div className="theme"><i className="fa-solid fa-moon"></i> Dark Mode</div>
                </div> 
                :    <div className="dropdown-content" style={{display: toggleMenu ? "block" : "none"}}>
                        <Link to="/login"><i className="fa-solid fa-user"></i> My Profile</Link>
                        <Link to="/login"><i className="fa-solid fa-layer-group"></i> My Playlists</Link>
                        <Link to="/login"><i className="fa-solid fa-clock"></i> Watch Later</Link>
                        <Link to="/login"><i className="fa-solid fa-thumbs-up"></i> Liked Videos</Link>
                        <Link to="/login"><i className="fa-solid fa-clock-rotate-left"></i> History</Link>
                        <div className="theme"><i className="fa-solid fa-moon"></i> Dark Mode</div>
                    </div> 
                }
            </div>
        </div>
    </nav>
    );
}

export { NavBar }