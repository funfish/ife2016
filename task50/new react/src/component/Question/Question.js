import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './Question.scss';

export default class Question extends Component {
	render() {
		let {question, sequence, Qactions} = this.props;

		return (
			<div className={styles.question}>
				<div className={styles["question-title"]}><b>Q{sequence}</b>
				<b><input type="text" ref={'titlen_Q-' + sequence} className={styles["editInput"]} defaultValue={`${question.title}`}
				  /></b>
				</div>
				<ul>
					{question.contentQ.map((item, i) => 
						<li key={i}>
							{question.like === 1 && <input type="radio" name="sigle"  />}
							{question.like === 2 && <input type="checkbox" />}
							{question.like !== 3 && <input type="text" ref={'textn_Q-' + sequence + '-' + i} defaultValue={`${item}`} />}
							{question.like === 3 && <textarea rows="4" cols="60" ref={'textn_Q-' + sequence + '-' + i}
							 	 defaultValue={`${item}`}></textarea>}
						</li>
					)}
				</ul>				
			</div>
		)
	}
}