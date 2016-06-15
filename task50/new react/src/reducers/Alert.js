import * as Types from '../constants/AlertActionTypes';

const initAlert = {
	show: false,
	content: [],
	actions: [],
	left: 0,
	top: 0,
	width: 0,
	height: 0
}

function Alert(state = initAlert, action) {
	switch (action.type) {
		case Types.ALERT_SHOW: 
			return Object.assign({}, state, {show: action.boolen})
		
		case Types.ALERT_POSITION: 
			return Object.assign({}, state, {
				left: action.left, 
				top: action.top,
				width: action.width,
				height: action.height
			})

		case Types.ALERT_CONTENT: 
			return Object.assign({}, state, {content: action.content})

		case Types.ALERT_ACTION:
			return Object.assign({}, state, {actions: action.actions})

		default: return state;
	}
}

export default Alert;