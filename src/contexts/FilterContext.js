import { createContext, useContext, useReducer } from "react";
import { FilterReducer } from "../reducers/FilterReducer";
const FilterContext = createContext();

const initialState = {
    category : "All"
}

const FilterProvider = ({children}) => {
    const [filterState, filterDispatch] = useReducer(FilterReducer, initialState);
    return ( 
        <FilterContext.Provider value={{ filterState, filterDispatch }}>
            {children}
        </FilterContext.Provider>
    );
}

const useFilter = () => useContext(FilterContext);

export {FilterProvider, useFilter};