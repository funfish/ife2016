import * as Types from '../constants/CalendarActionTypes';

let date = new Date();
const initDay = {
	calendarShow: false,
	deadline: '',
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    week: date.getDay()
}

function Calendar(state = initDay, action) {
	switch (action.type) {
		case Types.CALENDAR_SHOW: 
			return Object.assign({}, state, {calendarShow: !state.calendarShow})
		
		case Types.SET_CALENDAR: 
			return Object.assign({}, state, {
				year: action.year, 
				month: action.month,
				week: action.week,
				day: action.day
			})

		case Types.SET_DEADLINE: 
			return Object.assign({}, state, {deadline: state.year + '-' + (state.month + 1) + '-' + state.day})

		default: return state;
	}
}

export default Calendar;