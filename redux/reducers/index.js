import { combineReducers } from 'redux'
import { userState } from './user'
import { birthdays } from './birthdayReducer'
import { employeeDir } from './employeeDirReducer'
import { hop } from './hopReducer'
import { piState } from './piReducer'
import { circularReducer } from './circularReducer'

const Reducers = combineReducers({
    userState: userState,
    birthdayState: birthdays,
    employeeDirState:employeeDir,
    hopState:hop,
    piState:piState,
    circularState:circularReducer
})

export default Reducers