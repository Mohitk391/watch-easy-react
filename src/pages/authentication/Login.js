import { NavBar } from "../../components/NavBar/NavBar";
import "./authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { usePlaylist, useWatchLater, useLike, useUser } from "../../contexts/index";

const Login = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [user, setUser] = useState({ email: "", password: ""});
    const { playlistDispatch }= usePlaylist();
    const { watchLaterDispatch }= useWatchLater();
    const { likesDispatch }= useLike();
    const { userDispatch } = useUser();
    
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", {
            email: user.email,
            password: user.password,
            });
            const token = response.data.encodedToken;
            localStorage.setItem("token", token);
            userDispatch({type: "SET_USER", value: response.data.foundUser});
            playlistDispatch({type:"SET_PLAYLIST",payload: response.data.foundUser.playlists});
            watchLaterDispatch({type:"SET_WATCHLATER", payload: response.data.foundUser.watchlater});
            likesDispatch({type:"SET_LIKES", payload: response.data.foundUser.likes});
            navigate("/");
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <div className="page-layout">
        <NavBar />
        <div className="login-main flex flex-center">
            <form className="login-form flex flex-column flex-center flex-gap-1" onSubmit={e=>login(e)}>
                <h2 className="form-title">Login</h2>
                <div className="form-input flex flex-column">
                    <label>Email</label>
                    <input type="email" placeholder="abc@example.com" onChange={(e)=>setUser({...user, email: e.target.value})}/>
                </div>
                <div className="form-input flex flex-column pos-relative">
                    <label>Password</label>
                    <input type={isPasswordVisible ? "text":"password" }placeholder="********" onChange={(e)=>setUser({...user, password: e.target.value})}/>
                    <button  id="isPasswordVisible" onClick={(e)=>{e.preventDefault();setIsPasswordVisible(password=> !password);}}>{isPasswordVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}  </button>
                </div>
                <div className="extras flex flex-space-between">
                    <div className="flex flex-space-between">
                        <input type="checkbox" id="remember"/> <label htmlFor="remember">Remember me</label>             
                    </div>
                    <Link to="/login" className="forgot-pwd">Forgot Password?</Link> 
                </div>
                <button  type="submit" className="btn btn-hover auth-button sign-in">Login</button>
                <button className="btn btn-hover auth-button remove-from-wishlist-button" onClick={()=>navigate("/signup")}>New User? Sign Up</button>
            </form>
        </div>
    </div>
    );
};

export { Login };