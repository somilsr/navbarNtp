const initialState = {
}

export const circularReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CIRCULARS":
            return {
                ...state,
                circulars: action.data
            }
        case "NOTICES":
            return {
                ...state,
                notices: action.data
            }
        default:
            return state;
    }
}
