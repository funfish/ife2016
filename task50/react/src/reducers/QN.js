import { ADD_NEW_Q, DELETE_Q, TITLEN_Q, TEXTN_Q } from '../constants/ActionTypes'

const initialQState = [{
	idQ: 0,
	like: 1,
	title: '请输入标题',
	titlen: '请输入标题',
	contentQ: ['请输入选项', '请输入选项' , '请输入选项', '请输入选项'],
	contentQn: ['请输入选项', '请输入选项' , '请输入选项', '请输入选项']

}, {
	idQ: 1,
	like: 2,
	title: '请输入标题',
	titlen: '请输入标题',
	contentQ: ['请输入选项', '请输入选项' , '请输入选项', '请输入选项'],
	contentQn: ['请输入选项', '请输入选项' , '请输入选项', '请输入选项']
}, {
	idQ: 2,
	like: 3,
	title: '请输入标题',
	titlen: '请输入标题',
	contentQ: ['请输入文本'],
	contentQn: ['请输入选项']
}]

export default function Qlist (state = [], action) {
	switch(action.type) {
		case ADD_NEW_Q: 
			return [...state, Object.assign({}, initialQState[action.n], { idQ: Math.random().toString().split('.')[1] })]

		case DELETE_Q:
			return state.filter(Q => Q.idQ !== action.idQ)

		case TITLEN_Q:
			return state.map(Q => Q.idQ === action.idQ ?
				Object.assign({}, Q, { titlen: action.titlen }) : 
				Q
			)
		case TEXTN_Q: 
			return state.map(Q => Q.idQ === action.idQ ?
				Object.assign({}, Q, { contentQn: 
					Q.contentQn.map((text, i) => i === action.n ? Q.contentQn.textn = action.textn : 
						text
					)}) :
				Q
			)

		default :
			return state
	}
}