import { Add_New_QN, DELETE_QN, SELEDCT_QN, SELEDCT_QN_ALL, DELETE_QN_SOME} from '../constants/ActionTypes'

const initialQNState = [
	{
		id: Math.random().toString().split('.')[1],
		complete: false,
		selected: false,
		substate: 'false',
		deadline: '11111',
		title: '1111',
		content: []
	}
]

export default function listQN(state = initialQNState, action) {
	switch(action.type) {
		case Add_New_QN:
			return [...state, initialQNState]

		case DELETE_QN:
			return state.filter(QN => QN.id !== action.id)

		case SELEDCT_QN:
			return state.map(QN => QN.id === action.id ? 
				Object.assign({}, QN, { selected: true }) : 
				QN
			)

		case SELEDCT_QN_ALL:
			return state.map(QN => Object.assign({}, QN, { selected: true }))
	
		case DELETE_QN_SOME:
			return state.filter(QN => QN.selected === true)
			
	    default:
      		return state
	}
}