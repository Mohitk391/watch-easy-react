import axios from "axios";

const loginServiceHandler = async (userInput, isTestLogin) => {
    try{
        const response = await axios.post("/api/auth/login", {
            email: isTestLogin ? "adarshbalika@gmail.com" : userInput.email,
            password: isTestLogin ? "adarshBalika123" : userInput.password,
            });
        return response;
    }
    catch(error){
        return error.response;
    }
}

const signupServiceHandler = async (userInput) => {
    try {
        const response = await axios.post(`/api/auth/signup`, {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        password: userInput.password,
        });
        return response;
    }
    catch(error){
        return error.response;
    }
}

export {loginServiceHandler, signupServiceHandler}