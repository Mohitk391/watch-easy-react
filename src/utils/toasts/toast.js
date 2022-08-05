import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const deleteIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM336 311.1H175.1C162.7 311.1 152 301.3 152 288c0-13.26 10.74-23.1 23.1-23.1h160C349.3 264 360 274.7 360 288S349.3 311.1 336 311.1z"/>
        </svg>
    );
}

export const showToast = (type,text) => {
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    };
    
    const deleteToastStyle = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {"background-color": "red", 
                "color" : "white"},
        icon: deleteIcon(),
    }

    switch (type) {
        case "success" :
            return (toast.success(text, options));
        case "error":
            return (toast.error(text,options));
        case "delete":
            return (toast(text, deleteToastStyle));
        default:
            return (toast.info(text,options));
    }
    
}