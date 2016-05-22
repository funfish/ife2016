import React, { Component } from 'react'
import Button from './Button'

export default class Alert extends Component {
    constructor(props) {
      super(props);
    }
    changeId(){
    	this.props.changeId('')
    }
    deleteQN() {
    	const { curItem, actions, changeId } = this.props;
    	const that = this;
    	actions.deleteQN(curItem);
    	this.changeId.apply(that);
    }
	render() {
		const { curItem, actions, changeId, altertF} = this.props;
		return (
			<div id="grayCover">			
			<div id="alert">
				<div id="alertHeade" className="clearfix">
			  		<strong>提示</strong><span className="closebtn" onClick={this.changeId.bind(this)}>×</span> 
			  	</div>
			  	<ul>
			  		{this.props.value.map((item) => <li>{item}</li>)}
			  	</ul>
			  	<div id="alertButtons">
				  	<Button onAcClick={this.changeId.bind(this), this.deleteQN.bind(this)} value="确认"/>
				  	<Button onAcClick={this.changeId.bind(this)} value="取消"/>
			  	</div>
			</div>
			</div>
		)
	}
}