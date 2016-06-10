import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as QActions from '../../actions/Questionnarie';
import styles from './main.scss';

class Main extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let {list, edite, Qactions} = this.props;
		return list.length ? (
				<div></div>
			) : (
				<div className={styles["container-center"]} onClick={() => QActions.addNewQN()}>
					<Link to="/edit">
						<button className={styles["button-large"]}><b>新建文卷</b></button>
					</Link>
				</div>
			)
	}
}

const mapStateToProps = state => ({
	list: state.Questionnarie.list,
	edit: state.Questionnarie.edit
})

const mapDispatchToProps = dispatch => ({
	Qactions: bindActionCreators(QActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)