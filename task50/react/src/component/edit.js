import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Button from './Button'

class Edit extends Component {
	changeTitleQN () {
		this.props.actions.setTitleQN(ReactDOM.findDOMNode(this.refs.QNtitle).value)
	}
	render() {
		let { QNs, actions } = this.props;
		let QN = QNs.filter((QN) => QN.id === this.props.params.id)[0];	

		return (
			<div className="listQNs">
				<b><input type="text"  ref="titleQN" className="titleQN" defaultValue={`${QN.title}`} onBlur={this.changeTitleQN.bind(this)} /></b>
				<div className="middleQN">

					<div className="middleQNFooter">
						<div className="addChoose">
							<div>
								<span className="addBtn"><img src='../src/img/QN单选.png' />单选</span>
								<span className="addBtn"><img src='../src/img/QN多选.png' />单选</span>
								<span className="addBtn"><img src='../src/img/QN文本.png' />单选</span>
							</div>
						</div>
						<div className="addItem">
							<span>
							<img src='../src/img/QN加号.png' /> 添加问题
							</span>
						</div>
					</div>
				</div>
				<div className="footerQN">
					<label htmlFor="deadline">问卷截止日期</label>
					<input />
					<Button value="发布问卷" />
					<Button value="保存问卷" />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		QNs: state.listQN
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
)(Edit)