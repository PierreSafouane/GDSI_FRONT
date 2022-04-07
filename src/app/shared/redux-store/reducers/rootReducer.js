import { combineReducers } from "redux";
import authenticationReducer from './authenticationReducer';

/**
 * Combine all the reducers create in different files, to add them in the redux-store
 * So, if you create a new reducer, it needs to be added here
 * 
 * @author Peter Mollet
 */
export default combineReducers({
    authenticationReducer
})