import {combineReducers} from "redux"
import authreducer from "./auth.js"
import currentuserreducer from "./currentuser.js";


export default combineReducers({
    authreducer,
    currentuserreducer
});