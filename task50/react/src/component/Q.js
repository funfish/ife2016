import React, { Component } from 'react'
import ReactDOM from 'react-dom'


export default class Q extends Component {
	changeTitlenQ() {
		let { q, sequence, actions, id} = this.props;
		actions.setTitlenQ(id, q.idQ, ReactDOM.findDOMNode(this.refs['titlen_Q-' + sequence]).value)
	}
	changeTextnQ(i) {
		let { q, sequence, actions, id} = this.props;
		actions.setTextnQ(id, q.idQ, i, ReactDOM.findDOMNode(this.refs['textn_Q-' + sequence + '-' + i]).value)
	}
	render() {
		let { q, sequence, id} = this.props;
		return (
			<div className="question">
				<div className="questionTitle"><b>Q{sequence}</b>
				<b><input type="text" ref={'titlen_Q-' + sequence} className="editInput" defaultValue={`${q.titlen}`}
				 onBlur={this.changeTitlenQ.bind(this)} /></b>
				</div>
				<ul>
					{q.contentQn.map((item, i) => 
						<li key={i}>
							{q.like === 1 && <input type="radio" name="sigle"  />}
							{q.like === 2 && <input type="checkbox" />}
							{q.like !== 3 && <input type="text" ref={'textn_Q-' + sequence + '-' + i} className="editInput" defaultValue={`${item}`} 
							 	onBlur={this.changeTextnQ.bind(this, i)}/>}
							{q.like === 3 && <textarea rows="4" cols="60" ref={'textn_Q-' + sequence + '-' + i}
							 	onBlur={this.changeTextnQ.bind(this, i)} defaultValue={`${item}`}></textarea>}
						</li>
					)}
				</ul>
			</div> 
		)
	}
} 

