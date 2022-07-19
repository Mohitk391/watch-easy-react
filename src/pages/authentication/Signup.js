import { NavBar } from "../../components/NavBar/NavBar";
import "./authentication.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../contexts";

const Signup = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [user, setUser] = useState({firstName:"",lastName: "", email: "", password: "", confirmPassword: ""});
    const navigate = useNavigate();
    const { userDispatch } = useUser();

    const signin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/auth/signup`, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            });
            const token = response.data.encodedToken;
            localStorage.setItem("token", token);
            userDispatch({type: "SET_USER", value: response.data.foundUser});
            navigate("/login");
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <div className="page-layout">
        <NavBar />
        <div className="signup-main flex flex-center">
            <form className="signup-form flex flex-column flex-center flex-gap-1"onSubmit={e=>signin(e)}>
                <div className="form-title flex flex-column flex-center">
                    <h2>Signup</h2>
                </div>
                <div className="name-input flex flex-space-evenly">
                    <div className="user-name flex flex-column">
                        <label>First Name</label>
                        <input type="text" placeholder="John" onChange={(e)=>setUser({...user, firstName: e.target.value})}/>
                    </div>
                    <div className="user-name flex flex-column">
                        <label>Last Name</label>
                        <input type="text" placeholder="Doe" onChange={(e)=>setUser({...user, lastName: e.target.value})}/>
                    </div>
                </div>
                <div className="form-input flex flex-column">
                    <label>Email</label>
                    <input type="email" placeholder="abc@example.com" onChange={(e)=>setUser({...user, email: e.target.value})}/>
                </div>
                <div className="form-input flex flex-column pos-relative">
                    <label>Password</label>
                    <input type={isPasswordVisible ? "text": "password"} placeholder="*****" id="password-inp" onChange={(e)=>setUser({...user, password: e.target.value})}/>
                    <button  id="isPasswordVisible"onClick={(e)=>{e.preventDefault();setIsPasswordVisible(password=> !password);}}>{isPasswordVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>} </button>
                </div>
                <div className="form-input flex flex-column">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="********" onChange={(e)=>setUser({...user, password: e.target.value})}/>
                </div>
                <div className="extras flex ">
                    <div className="flex flex-space-between">
                        <input type="checkbox" id="remember"/> <label htmlFor="remember">Remember me</label>             
                    </div>
                </div>
                <button type="submit" className="btn btn-hover auth-button sign-in">Signup</button>
                <button className="btn btn-hover auth-button remove-from-wishlist-button" onClick={()=>navigate("/login")}>Existing User? Sign In</button>
            </form>
        </div>
    </div>
    );
};

export { Signup };