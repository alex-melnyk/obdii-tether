import {applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import OBDIIMIddleware from "./OBDIIMIddleware";

const middleware = [ReduxThunk, OBDIIMIddleware];

// if (process.env.NODE_ENV === 'development') {
// middleware.push(ReduxLogger);
// }

export default applyMiddleware(...middleware);