import { NavBar } from "../../components/NavBar/NavBar";
import "./authentication.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlaylist, useWatchLater, useLike, useUser } from "../../contexts/index";
import { loginServiceHandler } from "../../utils/APICallHandlers/AuthService";
import { showToast} from "../../utils/toasts/toast";

const Login = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [user, setUser] = useState({ email: "", password: "", emailError: false, passwordError: false});
    const { playlistDispatch }= usePlaylist();
    const { watchLaterDispatch }= useWatchLater();
    const { likesDispatch }= useLike();
    const { userDispatch } = useUser();
    const location = useLocation();
    
    const login = async (e, isTest) => {
        e.preventDefault();
        if(!isTest && ((user.email.trim()).length === 0 || (user.password.trim()).length === 0)){
            if((user.email.trim()).length===0)
                setUser({...user, emailError: true});
            if((user.password.trim()).length === 0)
                setUser({...user, passwordError: true});
            showToast("error", "please enter valid credentials!");
        }
        else{
            const response = await loginServiceHandler(user, isTest);
            switch (response.status) {
                case 200:
                {
                    localStorage.setItem("token", response.data.encodedToken);
                    userDispatch({type: "SET_USER", value: response.data.foundUser});
                    playlistDispatch({type:"SET_PLAYLIST",payload: response.data.foundUser.playlists});
                    watchLaterDispatch({type:"SET_WATCHLATER", payload: response.data.foundUser.watchlater});
                    likesDispatch({type:"SET_LIKES", payload: response.data.foundUser.likes});
                    showToast("success", "Login successful!!!");
                    const from = location.state?.from || '/';
                    navigate(from, { replace: true });
                    break;
                }
                case 404:
                {
                    showToast("error", "please enter valid email address!");
                    setUser({...user, emailError: true});
                    break;
                }
                case 401:
                {
                    showToast("error", "please enter valid password!");
                    setUser({...user, passwordError: true});
                    break;
                }
                default :
                {
                    showToast("error", "Something seems broken, sorry for the inconvinience");
                    break;
                }
            }
        }
        
        
    }

    return (
        <div className="page-layout">
        <NavBar />
        <div className="login-main flex flex-center">
            <form className="login-form flex flex-column flex-center flex-gap-1" onSubmit={e=>login(e, false)}>
                <h2 className="form-title">Login</h2>
                <div className="form-input flex flex-column">
                    <label>Email</label>
                    <input type="email" placeholder="abc@example.com" onChange={(e)=>setUser({...user, email: e.target.value, emailError: false})} className={`${user.emailError ? "incorrect-input" : ""}`}/>
                </div>
                <div className="form-input flex flex-column pos-relative">
                    <label>Password</label>
                    <input type={isPasswordVisible ? "text":"password" }placeholder="********" onChange={(e)=>setUser({...user, password: e.target.value, passwordError: false})} className={`${user.passwordError ? "incorrect-input" : ""}`}/>
                    <button  id="isPasswordVisible" onClick={(e)=>{e.preventDefault();setIsPasswordVisible(password=> !password);}}>{isPasswordVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}  </button>
                </div>
                <div className="extras flex flex-space-between">
                    <div className="flex flex-space-between">
                        <input type="checkbox" id="remember"/> <label htmlFor="remember">Remember me</label>             
                    </div>
                    <Link to="/login" className="forgot-pwd">Forgot Password?</Link> 
                </div>
                <button  type="submit" className="btn btn-hover auth-button sign-in">Login</button>
                <button  className="btn btn-hover auth-button sign-in" onClick={(e)=>login(e, true)}>Test Login</button>
                <button className="btn btn-hover auth-button remove-from-wishlist-button" onClick={()=>navigate("/signup")}>New User? Sign Up</button>
            </form>
        </div>
    </div>
    );
};

export { Login };