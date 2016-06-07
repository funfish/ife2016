import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as QActions from '../../actions/Questionnarie';
import styles from './main.scss';

class Main extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		let {list, edite} = this.props;
		return list.length ? (
				<div></div>
			) : (
				<div className={styles["container-center"]}>
					<button className={styles["button-large"]}><b>新建文卷</b></button>
				</div>
			)
	}
}

const mapStateToProps = state => ({
	list: state.Questionnarie.list,
	edite: state.Questionnarie.edite
})

const mapDispatchToProps = dispatch => ({
	Qactions: bindActionCreators(QActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)