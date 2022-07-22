import { createContext, useContext, useReducer } from "react";
import { LikesReducer } from "../reducers/LikesReducer";

const LikeContext = createContext();

const initialState = {
    likes : [],
}
const LikeProvider = ({children})=> {
    const [likesState, likesDispatch] = useReducer(LikesReducer, initialState);
    return (
        <LikeContext.Provider value={{likesState, likesDispatch}}>
            {children}
        </LikeContext.Provider>
    );
}

const useLike = () => useContext(LikeContext);

export { LikeProvider, useLike};
