const initialState = {
}

export const birthdays = (state = initialState, action) => {
    switch (action.type) {
        case "BIRTHDAY":
            return {
                ...state,
                data: action.data
            }
        case "BIRTHDAY_WISHES":
            return {
                ...state,
                wishes: action.data
            }
        default:
            return state;
    }
}