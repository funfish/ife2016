import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './Question.scss';

export default class Question extends Component {
    constructor(props) {
      super(props);
      this.changeTitleQ = this.changeTitleQ.bind(this);
      this.changeTextQ = this.changeTextQ.bind(this);
    }
	changeTitleQ(idQ, sequence) {
		this.props.Qactions.setTitleQ(idQ, ReactDOM.findDOMNode(this.refs["titlen_Q-" + sequence]).value)
	}
	changeTextQ(idQ, item, sequence) {
		this.props.Qactions.setTextQ(idQ, item, ReactDOM.findDOMNode(this.refs['textn_Q-' + sequence + '-' + item]).value)
	}
	render() {
		let {question, sequence, Qactions} = this.props;
		const idQ = question.idQ;
		return (
			<div className={styles.question}>
				<div className={styles["question-title"]}><b>Q{sequence}</b>
				<b><input type="text" ref={'titlen_Q-' + sequence} className={styles["editInput"]} defaultValue={`${question.title}`}
				  onBlur={() => this.changeTitleQ(idQ, sequence)}/></b>
				</div>
				<ul>
					{question.contentQ.map((item, i) => 
						<li key={i}>
							{question.like === 1 && <input type="radio" name="sigle"  />}
							{question.like === 2 && <input type="checkbox" />}
							{question.like !== 3 && <input type="text" ref={'textn_Q-' + sequence + '-' + i} defaultValue={`${item}`} 
								onBlur={() => this.changeTextQ(idQ, i, sequence)} />
							}
							{question.like === 3 && <textarea rows="4" cols="60" ref={'textn_Q-' + sequence + '-' + i}
							 	 defaultValue={`${item}`}></textarea>}
						</li>
					)}
				</ul>				
			</div>
		)
	}
}