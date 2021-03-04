const initialState = {
}

export const hop = (state = initialState, action) => {
    switch (action.type) {
        case "HOP_MESSAGE":
            return {
                ...state,
                hop: action.data
            }
        default:
            return state;
    }
}