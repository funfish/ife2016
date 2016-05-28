import * as types from '../constants/ActionTypes'

export function addNewQN(QN) {
	return { type: types.Add_New_QN, QN }
}
//问卷本身
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

export function setTitlenQN(id, titlen) {
	return { type: types.TITLEN_QN, id, titlen }
}

export function substateQN(text) {
	return { type: types.SUBSTATE_QN, text}
}
/*****************对于问题**************************/
export function addNewQ(id, n) {
	return { type: types.ADD_NEW_Q, id, n }
}

export function deleteQ(id, idQ) {
	return { type: types.DELETE_Q, id, idQ}
}

export function setTitlenQ(id, idQ, titlen) {
	console.log(111)
	return { type: types.TITLEN_Q, id, idQ, titlen }
}

export function setTextnQ(id, idQ, n,  textn) {
	return { type: types.TEXTN_Q, id,  idQ, n, textn }
}

export function saveQN(id) {
	return { type: types.SAVE_QN, id }
}