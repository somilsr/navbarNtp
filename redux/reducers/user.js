const initialState = {
}

export const userState = (state = initialState, action) => {
    switch (action.type) {
        case "USER_STATE":
            return {
                ...state,
                user:action.data
            }
        default:
            return state;
    }
}