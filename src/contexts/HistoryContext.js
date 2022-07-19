import { createContext, useContext, useReducer } from "react";
import { HistoryReducer } from "../reducers/HistoryReducer";

const HistoryContext = createContext();

const initialState = {
    history : [],
}

const HistoryProvider = ({children}) => {
    const [historyState, historyDispatch] = useReducer(HistoryReducer, initialState);

    return (<HistoryContext.Provider value={{historyState, historyDispatch}}>
        {children}
    </HistoryContext.Provider>
    );
}

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };