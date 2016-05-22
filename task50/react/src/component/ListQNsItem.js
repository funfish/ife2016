import React, { Component } from 'react'
import Button from '../component/Button'
//import { Link } from 'react-router'

let ListQNsItem = React.createClass({
	getInitialState() {
    	return { hoveredLi: false }
 	},
  	mouseOverHandlerLi() {
    	this.setState({ hoveredLi: true })
  	},
  	mouseOutHandlerLi() {
    	this.setState({ hoveredLi:false });
  	},
  	styleLi() {
  		if(this.state.hoveredLi) {
  			return { backgroundColor: "#e80" }
  		} else {
  			return { backgroundColor: "white" }
  		}
  	},
  	deleteQN(item) {
  		this.props.changeId(item)
  	},
	render() {
		const { QN, actions, titleWidth, stateWidth } = this.props;
		return(
			<li className="clearfix" onMouseOver={this.mouseOverHandlerLi} onMouseOut={this.mouseOutHandlerLi} style={this.styleLi()}>
				<input type="radio" value="" />
				<div ref="limiddleQNsList" className="limiddleQNsList clearfix">
					<div style={titleWidth} className="titleQNsList">{QN.title}</div> 
					<div className="timeQNsList">{QN.deadline}</div>	
					<div style={stateWidth} className="stateQNsList">{QN.substate}</div>
					<div className="actionQNsList clearfix">
						<Button  onAcClick={this.deleteQN.bind(this, QN.id)} value="删除" />
						<Button value="编辑" />
						<Button onClick={this.onClickHandle} value="查看问卷" />
					</div>
				</div>
			</li>
		)

	}
})
export default ListQNsItem