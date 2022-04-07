import { AUTHENTICATE, DECONNECTION } from "../actions/authenticationActions";
import { setToken } from './../../../shared/services/tokenServices';
import { isAuthenticated } from '../../../shared/services/accountServices';

/**
 * Reducer Authentication, to handle the actions of authentication
 * 
 * Reducers in redux is basically the functions that will be used when called an action in components
 * It is use to change the state of store, but it's still javascript, so you can do what you want if it's javascript
 * like clear a localstorage or set a token in the local storage
 * 
 * @author Peter Mollet
 */


/**
 * initial state: is logged check if the user is already authenticated when openning the Application
 * @author Peter Mollet
 */
const initialState = { 
    isLogged : isAuthenticated() 
}

/**
 * Set token and put isLogged at true
 * 
 * @param {object} state 
 * @param {string} payload : the token
 * PAYLOAD is a generic term, it is what the action will give you, it can be anything you want (string, number, object, array, etc...)
 * @author Peter Mollet
 */
function actionAuthenticate(state, payload) {
    setToken(payload)
    return Object.assign({}, state, { 
        isLogged : true 
    });
}

/**
 * Clear storage and put isLogged at false
 * 
 * @param {object} state 
 * @author Peter Mollet
 */
function actionDeconnection(state) {
    localStorage.clear()
    return Object.assign({}, state, { 
        isLogged : false 
    });
}

/**
 * A simple function switch, to decide what function reducer to use depending on the action
 * 
 * @param {object} state
 * @param {string} action
 * @author Peter Mollet
 */
export default function authenticationReducer(state = initialState, action){
    switch (action.type) {
        case AUTHENTICATE: return actionAuthenticate(state, action.payload)
        case DECONNECTION: return actionDeconnection(state)
        default: return state
    }
}

