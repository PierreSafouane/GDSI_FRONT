import { getToken, getPayloadToken } from './tokenServices';

/**
 * To get all the roles of the current user
 * 
 * @return {Array} roles of the current user
 * @author Peter Mollet
 */
export function accountRoles() {
    const payload = getPayloadToken()
    return payload.auth.split(",")
}

/**
 * To get the login of the current user
 * 
 * @return {string} login of the current user
 * @author Peter Mollet
 */
export function accountLogin(){
    const payload = getPayloadToken()
    
    return payload.sub
}

/**
 * To check if the current user is authenticated
 * Check the token, and it's validity
 * 
 * @return {boolean} true if user is authenticated
 * @author Peter Mollet
 */
export function isAuthenticated() {
    try{
        const token = getToken()
        const payload = getPayloadToken()
        const roles = payload.auth.split(",")
        const expirationDate = payload.exp
        const login = payload.sub
        const dateNow = new Date();
        return token
            && roles.length > 0
            && login
            && expirationDate < dateNow.getTime()
    } catch {
        return false
    }
}