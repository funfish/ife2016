import * as Types from '../constants/QuestionnarieActionTypes'

const initialQNEdite = {
	addChoose: false,
	content: {
		id: Math.random().toString().split('.')[1],
		complete: false,
		selected: false,
		substate: 'false',
		deadline: '',
		title: '这里是标题',
		contentQs: []
	}
}

let initialQNState = {
	list: [],
	edit: Object.assign({}, initialQNEdite)
}

function Questionnarie (state = initialQNState, action) {
	switch(action.type) {
		case Types.Add_New_QN: 
 			return Object.assign({}, state, {edit: 
 				Object.assign({}, initialQNEdite, {id: Math.random().toString().split('.')[1]})
 			})

		case Types.DELETE_QN: return state.list.filter(QN => QN.id !== action.id)

		case Types.TITLE_QN: 
			return Object.assign({}, state, {edit:{content:{title: action.title}}})

		default: return state
	}
}

export default Questionnarie;