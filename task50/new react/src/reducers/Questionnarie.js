import * as Types from '../constants/QusetionnarieActionTypes'

const initialQNEdite = {
	id: Math.random().toString().split('.')[1],
	complete: false,
	selected: false,
	substate: 'false',
	deadline: '11111',
	title: '1111',
	contentQs: [],
}

let initialQNState = {
	list: [],
	edite: cloneObject(initialQNEdite)
}

function qusetionnarie (state = initialQNState, action) {
	switch(action.type) {
		case Types.Add_New_QN: 
			const { edite } = state;
 			return edite: {cloneObject(initialQNEdite), id: Math.random().toString().split('.')[1]}

		case Types.DELETE_QN: return state.list.filter(QN => QN.id !== action.id)

	}
}