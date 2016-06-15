import {combineReducers} from 'redux';
import Questionnarie from './Questionnarie';
import Calendar from './Calendar';
import Alert from './Alert';

const rootReducer = combineReducers({
	Questionnarie,
	Calendar,
	Alert
})

export default rootReducer