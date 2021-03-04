const initialState = {
}

export const employeeDir = (state = initialState, action) => {
    switch (action.type) {
        case "EMPLOYEE":
            return {
                ...state,
                directory: action.data
            }
        default:
            return state;
    }
}