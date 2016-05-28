import { Add_New_QN, DELETE_QN, SELEDCT_QN, SELEDCT_QN_ALL, SAVE_QN,
	DELETE_QN_SOME, TITLEN_QN, ADD_NEW_Q, DELETE_Q, TITLEN_Q, TEXTN_Q } from '../constants/ActionTypes'
import  Qlist from './QN'

const initialQNState = [
	{
		id: Math.random().toString().split('.')[1],
		complete: false,
		selected: false,
		substate: 'false',
		deadline: '11111',
		deadlinen: '11111',
		title: '1111',
		titlen: '1111',
		contentQs: [],
		contentQsn: []
	}
]

export default function listQN(state = initialQNState, action) {
	switch(action.type) {
		case Add_New_QN:
			return [...state, Object.assign({}, initialQNState[action.n], { id: Math.random().toString().split('.')[1] })]

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
		
		case TITLEN_QN:
			return state.map(QN => QN.id === action.id ? 
						Object.assign({}, QN, { titlen: action.titlen }) : 
						QN 
					)
		case SAVE_QN: 
			return state.map(QN => { console.log(QN.id, action.id)
				return QN.id === action.id ? 
						Object.assign({}, QN, { 
							title: QN.titlen, 
							deadline: QN.deadlinen,
							contentQs: QN.contentQsn
						}) : QN 
					})
		case ADD_NEW_Q:
		case DELETE_Q:
		case TITLEN_Q:
		case TEXTN_Q:
			return state.map((QN) => QN.id === action.id ? 
						Object.assign({}, QN, { contentQsn: Qlist(QN.contentQsn, action) }) : 
						QN
					)

	    default:
      		return state
	}
}