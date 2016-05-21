import React, { Component } from 'react'
//import { Link } from 'react-router'

export default class ListQNsItem extends Component {
	render() {
		const { QN, actions, titleWidth, stateWidth } = this.props;
		console.log(actions);
		return(
			<li className="clearfix">
				<input type="radio" value="" />
				<div ref="limiddleQNsList" className="limiddleQNsList clearfix">
					<div style={titleWidth} className="titleQNsList">{QN.title}</div> 
					<div className="timeQNsList">{QN.deadline}</div>	
					<div style={stateWidth} className="stateQNsList">{QN.substate}</div>
					<div className="actionQNsList clearfix">
						<button onClick={() => actions.deleteQN(QN.id)}>删除</button>
						<button>编辑</button>
						<button onClick={this.onClickHandle}>查看问卷</button>
					</div>
				</div>
			</li>
		)

	}
}