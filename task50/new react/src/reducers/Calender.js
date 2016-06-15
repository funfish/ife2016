import * as Types from '../constants/CalenderActionTypes';

let date = new Date();
const initDay = {
	calenderShow: false,
	deadLine: '',
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    week: date.getDay()
}

function Calender(state = initDay, action) {
	switch (action.type) {
		case Types.CALENDER_SHOW: 
			return Object.assign({}, state, {calenderShow: !state.calenderShow})
		
		case Types.SET_CALENDER: 
			return Object.assign({}, state, {
				year: action.year, 
				month: action.month,
				week: action.week,
				day: action.day
			})

		case SET_DEADLINE: 
			return Object.assign({}, state, {deadLine: state.year + '-' + state.month + 1 + '-' + state.day})

	}
}

export default Calender;