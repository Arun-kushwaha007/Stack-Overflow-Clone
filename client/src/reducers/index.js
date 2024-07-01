import {combineReducers} from "redux"
import authreducer from "./auth.js"
import currentuserreducer from "./currentuser.js";
import usersReducer from "./users.js";

export default combineReducers({
    authreducer,
    currentuserreducer,
    usersReducer
});