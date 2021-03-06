import * as types from '../constants/QusetionnaireActionTypes'

export function addNewQN(QN) {
	return { type: types.Add_New_QN, QN }
}

export function deleteQN(id) {
	return { type: types.DELETE_QN, id}
}

export function selectQN(id) {
	return { type: types.SELEDCT_QN, id } 
}

export function selectQNAll() {
	return { type: types.SELEDCT_QN_ALL } 
}

export function deleteQNSome() {
	return { type: types.DELETE_QN_SOME } 
}

export function setDeadLineQN(time) {
	return { type: types.DEAD_LINE_QN, time }
}

export function setTitleQN(id, title) {
	return { type: types.TITLE_QN, id, title }
}

export function substateQN(text) {
	return { type: types.SUBSTATE_QN, text}
}