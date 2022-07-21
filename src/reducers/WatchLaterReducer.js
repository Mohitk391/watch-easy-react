
const WatchLaterReducer = (watchLaterState, action)=> {
    switch (action.type) {
        case "SET_WATCHLATER":
            return {...watchLaterState, watchLater: action.payload};
        default: 
            return watchLaterState;
    }
}

export { WatchLaterReducer }