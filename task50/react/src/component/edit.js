import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Button from './Button'
import Q from './Q'
import Calender from './Calender'

class Edit extends Component {
    constructor(props) {
      super(props);
      this.state = {addChoose: false}
    }	
    componentWillUnmount() {
    	this.setState({
    		addChoose: false
    	})
    }
	changeTitlenQN(id) {
		this.props.actions.setTitlenQN(id, ReactDOM.findDOMNode(this.refs.titleQN).value)
	}
	render() {
		let { QNs, actions } = this.props;
		let { addChoose } = this.state;
		let QN = QNs.filter(QN => QN.id === this.props.params.id)[0];	

		return (
			<div className="editQN">
				<b><input type="text"  ref="titleQN" className="titleQN editInput" defaultValue={`${QN.titlen}`} onBlur={this.changeTitlenQN.bind(this, QN.id)} /></b>
				<div className="middleQN">
					{QN.contentQsn.map((item ,i) => <Q key={i} q={item} sequence={i+1} id={QN.id} actions={actions} />)}
					<div className="middleQNFooter">
						{addChoose && <div className="addChoose">
							<div className="positionBtn">
								<div className="addBtn" onClick={() => actions.addNewQ(QN.id, 0)}><img src='../src/img/QN单选.png' />单选</div>
								<div className="addBtn" onClick={() => actions.addNewQ(QN.id, 1)}><img src='../src/img/QN多选.png' />多选</div>
								<div className="addBtn" onClick={() => actions.addNewQ(QN.id, 2)}><img src='../src/img/QN文本.png' />文本题</div>
							</div>
						</div>
						}
						<div className="addItem" onClick={() => this.setState({addChoose: true})}>
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
					<Button value="保存问卷" onAcClick={() => actions.saveQN(QN.id)} />
					<Calender />
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