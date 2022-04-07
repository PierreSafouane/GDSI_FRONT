import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

/**
 * To configure the store redux. 
 * This is the beginning of redux
 * It's create the store, with all the Reducers and the middleware redux-thunk (https://github.com/reduxjs/redux-thunk)
 * 
 * @author Peter Mollet
 */
export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}