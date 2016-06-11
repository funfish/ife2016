import {combineReducers} from 'redux';
import Questionnarie from './Questionnarie';
import Calendar from './Calendar';

const rootReducer = combineReducers({
	Questionnarie,
	Calendar
})

export default rootReducer