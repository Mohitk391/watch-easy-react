import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../contexts";
import { showToast } from "../../utils/toasts/toast";

const NavBar = () => {
    const { userState,userDispatch } = useUser();
    const [toggleMenu, setToggleMenu] = useState(false);
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.clear();
        userDispatch({type:"UNSET_USER"}); 
        showToast("success", "Logged out Successfully!!!");
        navigate("/");
    }

    return (
    <nav className="navbar-2">
        <Link to="/" className="logo">WATCH EASY</Link>
        <div className="navbar-links flex flex-space-evenly">
            { !userState.isUserLoggedIn ? <Link to="/login"><button className="btn btn-hover sign-in">Login <i className="fa-solid fa-arrow-right"></i></button></Link> :
            <button className="btn btn-hover sign-in" onClick = {()=>{logoutUser()}}>Logout</button>
            }
            <Link to="/explore"><i className="fa-solid fa-compass" title="Explore Videos"></i></Link>
            <div className="menu-dropdown">
                <i className="fa-solid fa-user dropbtn" onClick={()=>{ setToggleMenu(!toggleMenu)}}></i>
                <div className="dropdown-content" style={{display: toggleMenu ? "block" : "none"}}>
                    <Link to="/playlist"><i className="fa-solid fa-layer-group"></i> My Playlists</Link>
                    <Link to="/watchlater"><i className="fa-solid fa-clock"></i> Watch Later</Link>
                    <Link to="/liked"><i className="fa-solid fa-thumbs-up"></i> Liked Videos</Link>
                    <Link to="/history"><i className="fa-solid fa-clock-rotate-left"></i> History</Link>
                </div> 
                
            </div>
        </div>
    </nav>
    );
}

export { NavBar }