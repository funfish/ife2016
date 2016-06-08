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
	let {edit} = state;
	switch(action.type) {
		case Types.Add_New_QN: 
			let init = Object.assign({}, initialQNEdite);
			init.content.id = Math.random().toString().split('.')[1];
 			console.log(init);
 			return Object.assign({}, state, {edit: init});

		case Types.DELETE_QN: return state.list.filter(QN => QN.id !== action.id);

		case Types.TITLE_QN: 			
			edit.content.title = action.title;
			return Object.assign({}, state, {edit: edit})

		case Types.ADD_Q: 
			edit.addChoose = true; 
			return Object.assign({}, state, {edit: edit})
		default: return state
	}
}

export default Questionnarie;