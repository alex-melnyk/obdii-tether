import {combineReducers} from "redux";
import app from "./app";
import drive from "./drive";

export default combineReducers({
    app,
    drive
})