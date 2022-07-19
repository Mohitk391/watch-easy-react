
const LikesReducer = (likesState, action)=> {
    switch (action.type) {
        case "SET_LIKES":
            return {...likesState, likes: action.payload};
        default: 
            return likesState;
    }
}

export { LikesReducer }