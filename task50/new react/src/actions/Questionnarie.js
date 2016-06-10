import * as types from '../constants/QuestionnarieActionTypes'

export function addNewQN() {
	return {type: types.Add_New_QN}
}

export function deleteQN(id) {
	return {type: types.DELETE_QN, id}
}

export function selectQN(id) {
	return {type: types.SELEDCT_QN, id} 
}

export function selectQNAll() {
	return {type: types.SELEDCT_QN_ALL} 
}

export function deleteQNSome() {
	return {type: types.DELETE_QN_SOME} 
}

export function setTitleQN(title) {
	return {type: types.TITLE_QN, title}
}

export function substateQN(text) {
	return {type: types.SUBSTATE_QN, text}
}

export function addChoose() {
	return {type: types.ADD_Q}
}

export function addNewQ(n) {
	return {type: types.ADD_NEW_Q, n}
}

export function setTitleQ(idQ, value) {
	return {type: types.SET_Q_TITLE, idQ, value}
}

export function setTextQ(idQ, item, value) {
	return {type: types.SET_Q_TEXT, idQ, item, value}
}