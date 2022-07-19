import { createContext, useContext, useReducer } from "react";
import { UserReducer } from "../../src/reducers/UserReducer";

const UserContext = createContext();

const initialState = {
    user : null,
    isUserLoggedIn : localStorage.getItem("token") ? true : false
}

const UserProvider = ({children}) => {
    const [userState, userDispatch] = useReducer(UserReducer, initialState);


    return (<UserContext.Provider value={{userState, userDispatch}}>
        {children}
    </UserContext.Provider>)
}

const useUser = () => useContext(UserContext);

export {UserProvider, useUser};