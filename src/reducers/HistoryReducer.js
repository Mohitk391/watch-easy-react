
const HistoryReducer = (historyState, action)=> {
    switch (action.type) {
        case "SET_HISTORY":
            return {...historyState, history: action.payload};
        default: 
            return historyState;
    }
}

export { HistoryReducer }