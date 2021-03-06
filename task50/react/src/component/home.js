import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import ListQNsItem from './ListQNsItem'
import Alert from './Altert'

class home extends Component {
    constructor(props) {
      super(props);
      this.state = {titleWidth: 0, stateWidth: 0, altertF: false, curItem: ''};
    }
	componentDidMount() {
	    this.remeasure();
    	window.addEventListener('resize', this.remeasure.bind(this));
	}
	componentWillUnmount() {
	    window.removeEventListener('resize', this.remeasure.bind(this));
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
	changeId(id) {
		this.setState({
			altertF: !this.state.altertF,
			curItem: id
		})
	}
	render() {
		let { titleWidth, stateWidth, altertF, curItem} = this.state;
		let { listQNs, actions } = this.props;
		return (
			<div>
				{altertF && <Alert value={['确认要删除此卷吗？']} actions={actions} curItem={curItem} changeId={this.changeId.bind(this)} />}
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
						{listQNs.map((QN, i) => <ListQNsItem key={i} QN={QN} actions={actions} changeId={this.changeId.bind(this)} titleWidth={this.styleT()} stateWidth={this.styleS()} />)}
					</ul>
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
)(home)