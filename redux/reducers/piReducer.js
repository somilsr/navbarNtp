const initialState = {
}

export const piState = (state = initialState, action) => {
    switch (action.type) {
        case "PI_STATE":
            return {
                ...state,
                pi:action.data
            }
        default:
            return state;
    }
}