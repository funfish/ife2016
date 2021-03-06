import * as Types from '../constants/QuestionnarieActionTypes';

const initialQNEdite = {
	id: Math.random().toString().split('.')[1],
	complete: false,
	selected: false,
	substate: '未发布',
	deadline: '',
	title: '这里是标题',
	contentQs: []
}

const initialQedit = [{
	idQ: 0,
	like: 1,
	title: '请输入标题',
	contentQ: ['请输入选项', '请输入选项' , '请输入选项', '请输入选项'],

}, {
	idQ: 1,
	like: 2,
	title: '请输入标题',
	contentQ: ['请输入选项', '请输入选项' , '请输入选项', '请输入选项'],
}, {
	idQ: 2,
	like: 3,
	title: '请输入标题',
	contentQ: ['请输入文本'],
}]

let initialQNState = {
	addChoose: false,
	list: [],
	edit: Object.assign({}, initialQNEdite)
}

function Questionnarie (state = initialQNState, action) {
	let editTemp = Object.assign({}, state.edit);
	let listTemp = [...state.list];
	switch(action.type) {
		case Types.Add_New_QN: 
			let init = Object.assign({}, initialQNEdite);
			init.id = Math.random().toString().split('.')[1];
 			return Object.assign({}, state, {edit: init});

		case Types.DELETE_QN: return Object.assign({}, state, {list: state.list.filter(QN => QN.id !== action.id)}) 

		case Types.EDIT_QN: 
				Object.assign({}, state, {edit: state.list.forEach((QN) => {
						if (QN.id === action.id) {
							return QN
						}
					})
				})

		case Types.ADD_Q: 
			return Object.assign({}, state, {addChoose: !state.addChoose})

		case Types.TITLE_QN: 	
			editTemp.title = action.title;
			return Object.assign({}, state, {edit: editTemp})
		
		case Types.ADD_NEW_Q: 	
			editTemp.contentQs = [...editTemp.contentQs, Object.assign({}, initialQedit[action.n], {idQ: Math.random().toString().split('.')[1]})]
			return Object.assign({}, state, {edit: editTemp})

		case Types.SET_DEADLINE_QN: 
			editTemp.deadline = action.deadline;
			return Object.assign({}, state, {edit: editTemp})

			
		case Types.SUBSTATE_QN:
			editTemp.substate = '发布';
			return Object.assign({}, state, {edit: editTemp})

		case Types.SAVE_QN:
			let flag = true;
			editTemp.complete = true;
			listTemp.forEach((QN, i) => {
				if(QN.id === editTemp.id) {
					listTemp[i] = editTemp
					flag = false;
				}	
			})
			if(flag) {
				listTemp = [...listTemp, Object.assign({}, editTemp)]
			}
			
			return Object.assign({}, state, {edit: editTemp, list: listTemp})

		case Types.SET_Q_TITLE:
		case Types.SET_Q_TEXT:
			return Object.assign({}, state, {edit: Object.assign({}, state.edit, 
						{contentQs: Question(state.edit.contentQs, action)})
					})

		default: return state
	}
}

function Question (state = [], action) {
	switch(action.type) {
		case Types.SET_Q_TITLE:
			return state.map(question => question.idQ === action.idQ ? 
					 	Object.assign({}, question, {title: action.value}) :
					 	question
					)

		case Types.SET_Q_TEXT:
			return state.map(question => question.idQ === action.idQ ? 
						Object.assign({}, question, {contentQ: 
							question.contentQ.map((option, i) => i === action.item ? 
								option = action.value : option
							)
						}) : question
					)
		default: return state;
	}
}

export default Questionnarie;