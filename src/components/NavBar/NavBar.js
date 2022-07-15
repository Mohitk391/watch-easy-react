import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {

    const [toggleMenu, setToggleMenu] = useState(false);

    return (
    <nav className="navbar-2">
        <Link to="/" className="logo">WATCH EASY</Link>
        <div className="navbar-search">
            <input className="navbar-searchbar" type="text" placeholder="Search for a video..."/>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="navbar-links flex flex-space-evenly">
            <button className="btn btn-hover sign-in">Login <i className="fa-solid fa-arrow-right"></i></button>
            <Link to="/"><i className="fa-solid fa-video" title="Upload Video"></i></Link>
            <Link to="/"><i className="fa-solid fa-compass" title="Explore Videos"></i></Link>
            <div className="menu-dropdown">
                <i className="fa-solid fa-user dropbtn" onClick={()=>{ setToggleMenu(!toggleMenu)}}></i>
                <div className="dropdown-content" style={{display: toggleMenu ? "block" : "none"}}>
                    <Link to="/profile"><i className="fa-solid fa-user"></i> My Profile</Link>
                    <Link to="/playlist"><i className="fa-solid fa-layer-group"></i> My Playlists</Link>
                    <Link to="/watchlater"><i className="fa-solid fa-clock"></i> Watch Later</Link>
                    <Link to="/liked"><i className="fa-solid fa-thumbs-up"></i> Liked Videos</Link>
                    <Link to="/history"><i className="fa-solid fa-clock-rotate-left"></i> History</Link>
                    <div className="theme"><i className="fa-solid fa-moon"></i> Dark Mode</div>
                </div>
            </div>
        </div>
    </nav>
    );
}

export { NavBar }