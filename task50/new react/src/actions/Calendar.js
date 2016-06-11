import * as types from '../constants/CalendarActionTypes';

export function setDeadLine() {
	return {type: types.SET_DEADLINE}
}

export function showCalendar() {
	return {type: types.CALENDAR_SHOW}
}

export function setCalendar(year, month, week, day) {
	return {type: types.SET_CALENDAR, year, month, week, day}
}