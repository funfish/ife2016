import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import ListQNsItem from '../component/ListQNsItem'

class QN extends Component {
    constructor(props) {
      super(props);
      this.state = {titleWidth: 0, stateWidth: 0};
    }
	componentDidMount() {
	    this.remeasure();
    	window.addEventListener('resize', this.remeasure.bind(this));
	}
	componentWillUnmount() {
	    window.removeEventListener('resize', this.remeasure);
    }
	remeasure() {
		let middleWidth = ReactDOM.findDOMNode(this.refs.limiddleQNsList).offsetWidth;
		let listWidth = ReactDOM.findDOMNode(this.refs.listQNs).offsetWidth;
		let temp = middleWidth - listWidth * 0.06 - 314;
		this.setState({
			titleWidth: temp * 0.66,
			stateWidth: temp * 0.33
		})
	}
	styleT() {
		return {width: this.state.titleWidth}
	}
	styleS() {
		return {width: this.state.stateWidth}
	}
	render() {
		const { titleWidth, stateWidth} = this.state;
		const { listQNs, actions } = this.props;
		return (
			<div id="containerMain" className="clearfix">
				<div className="header">
					<span><b>问卷调查</b></span>
					<span>我的问卷</span>
				</div>
				<div id="containerListQNs">
					<ul ref="listQNs" className="listQNs">
						<li className="clearfix">
							<div ref="limiddleQNsList" className="limiddleQNsList clearfix">
								<div style={this.styleT()} className="titleQNsList">标题</div> 
								<div className="timeQNsList">时间</div>	
								<div style={this.styleS()} className="stateQNsList">状态</div>
								<div className="actionQNsList clearfix">
									<span>操作</span>
									<button onClick={this.onClickHandle}>+新建问卷</button>
								</div>
							</div>
						</li>
						{listQNs.map((QN) => <ListQNsItem QN={QN} actions={actions} titleWidth={this.styleT()} stateWidth={this.styleS()} />)}
					</ul>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		listQNs: state.listQN		
	}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QN)