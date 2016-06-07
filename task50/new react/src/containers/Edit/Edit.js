import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as QActions from '../../actions/Questionnarie';
import styles from './Edit.scss';

class Edit extends Component {
    constructor(props) {
      super(props);
      this.changeTitleQN = this.changeTitleQN.bind(this);
    }
	changeTitleQN() {
		this.props.Qactions.setTitleQN(ReactDOM.findDOMNode(this.refs.titleQN).value)
	}

	render() {

		let {edit, addChoose, Qactions} = this.props;

	    return (
			<div className={styles["container-center"]}>
					<b><input type="text" ref="titleQN" className={styles["titleQN"]} defaultValue={`${edit.title}`} onBlur={this.changeTitleQN} /></b>
			</div>	
	    )
	}
}

const mapStateToProps = state => ({
	edit: state.Questionnarie.edit.content,
	addChoose: state.Questionnarie.edit.addChoose
})

const mapDispatchToProps = dispatch => ({Qactions: bindActionCreators(QActions, dispatch)})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit)
