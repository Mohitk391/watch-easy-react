import { createContext, useContext, useReducer } from "react";
import { WatchLaterReducer } from "../reducers/WatchLaterReducer";

const WatchLaterContext = createContext();

const initialState = {
    watchLater : [],
}

const WatchLaterProvider = ({children}) => {
    const [watchLaterState, watchLaterDispatch] = useReducer(WatchLaterReducer, initialState);

    return (<WatchLaterContext.Provider value={{watchLaterState, watchLaterDispatch}}>
        {children}
    </WatchLaterContext.Provider>
    );
}

const useWatchLater = () => useContext(WatchLaterContext);

export { WatchLaterProvider, useWatchLater };