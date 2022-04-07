import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { URL_LOGIN } from '../../shared/constants/urls/urlConstants';
import { useDispatch, useSelector } from 'react-redux';
import { URL_HOME } from '../../shared/constants/urls/urlConstants';
import { signOut } from '../../shared/redux-store/actions/authenticationActions';

/**
 * Component to handle the login button
 * Either to sign in link to the login view if the user isn't logged
 * or the sign out button if the user is not logged
 * 
 * @author Peter Mollet
 */
const ConnectionBtn = () => {

    const dispatch = useDispatch()
    const isLogged = useSelector(({authenticationReducer:{ isLogged }}) => isLogged)
    const history = useHistory();

    const handleSignOut = () =>{ 
        dispatch(signOut())
        history.push(URL_HOME)
    }
   
    const LoginLink = () => <NavLink to={URL_LOGIN} className='nav-link text-white' activeClassName='text-muted'>Sign in</NavLink>
    
    const DeconnectionButton = () => <button className='btn btn-link nav-link text-white m-0' onClick={handleSignOut} >Sign out</button>

    return isLogged ? <DeconnectionButton /> : <LoginLink/>
}


export default ConnectionBtn;