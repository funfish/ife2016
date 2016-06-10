import * as types from '../constants/CalenderActionTypes'

export function setDeadLine() {
	return {type: types.SET_DEADLINE}
}

export function showCalender() {
	return {type: types.CALENDER_SHOW}
}

export function setCalender(year, month, week, day) {
	return {type: types.SET_CALENDER, year, month, week, day}
}