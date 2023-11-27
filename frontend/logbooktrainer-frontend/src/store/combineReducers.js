// reducers.js
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import listaReducer from './reducers/listaReducer';
import selectReducer from './reducers/selectReducer';


const rootReducer = combineReducers({
    lista: listaReducer,
    select: selectReducer,
    auth: authReducer
});

export default rootReducer;
