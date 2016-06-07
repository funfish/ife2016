import * as Types from '../constants/QuestionnarieActionTypes'

const initialQNEdite = {
	id: Math.random().toString().split('.')[1],
	complete: false,
	selected: false,
	substate: 'false',
	deadline: '',
	title: '这里是标题',
	contentQs: [],
}

let initialQNState = {
	list: [],
	edite: Object.assign({}, initialQNEdite)
}

function Questionnarie (state = initialQNState, action) {
	switch(action.type) {
		case Types.Add_New_QN: 
 			return Object.assign({}, state, {edite: 
 				Object.assign({}, initialQNEdite, {id: Math.random().toString().split('.')[1]})
 			})

		case Types.DELETE_QN: return state.list.filter(QN => QN.id !== action.id)

		default: return state
	}
}

export default Questionnarie;