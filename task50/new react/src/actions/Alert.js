import * as types from '../constants/AlertActionTypes';

export function showAlert(boolen) {
	return {type: types.ALERT_SHOW, boolen}
}

export function setAlertPosition(left, top, width, height) {
	return {type: types.ALERT_POSITION, left, top, width, height}
}

export function setAlertContent(content) {
	return {type: types.ALERT_CONTENT, content}
}

export function alertAction(actions) {
	return {type: types.ALERT_ACTION, actions}
}
