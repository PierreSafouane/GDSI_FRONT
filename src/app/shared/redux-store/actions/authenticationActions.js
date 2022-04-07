/**
 * Actions Authentication
 * 
 * actions in redux is the function that we will use in the components, and will activate the reducer(s) binded to the action chosen
 * 
 * @author Peter Mollet
 */

/**
 * List of the actions type
 * @author Peter Mollet
 */
export const AUTHENTICATE = 'AUTHENTICATE'
export const DECONNECTION = 'DECONNECTION'

/**
 * Action Sign in, to use when the user authenticate himself in the app
 * 
 * @param {string} token 
 * @author Peter Mollet
 */
export const signIn = (token) => ({
    type: AUTHENTICATE,
    payload: token
});

/**
 * Action Sign out, used when the user deconnect himself from the App
 * 
 * @author Peter Mollet
 */
export const signOut = () => ({
    type: DECONNECTION
})