import { combineReducers } from 'redux';
import { routerReducer  } from "react-router-redux";
import Questionnarie from './Questionnarie';

const rootReducer = combineReducers({
	routing: routerReducer,
	Questionnarie
})

export default rootReducer