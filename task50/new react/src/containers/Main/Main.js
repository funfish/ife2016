import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as QActions from '../../actions/Questionnarie';
import * as AActions from '../../actions/Alert';
import 	QNList from '../../component/QNList/QNList'; 
import Alert from '../../component/Alert/Alert';
import styles from './main.scss';

class Main extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let {list, alert: {show}, Qactions, Aactions} = this.props;
		return list.length ? (
				<ul ref="container-center-main" className={styles["container-center-main"]}>
					{show && <Alert />}
					<li className={styles.clearfix}>
						<div ref="middle-list" className={styles["middle-list"]}>
							<div className={styles["title-list"]}>标题</div> 
							<div className={styles["right-list"]}>
								<div className={styles["time-list"]}>时间</div>	
								<div className={styles["state-list"]}>状态</div>
								<div className={styles["action-list"]}>
									<span>操作</span>
									<button onClick={() => Qactions.addNewQN()}>新建问卷</button>
								</div>
							</div>	
						</div>
					</li>
					{list.map((item, i) => <QNList key={i} Qactions={Qactions} Aactions={Aactions} item={item}/>)}
				</ul>
			) : (
				<div className={styles["container-center"]} onClick={() => QActions.addNewQN()}>
					<Link to="/edit">
						<button className={styles["button-large"]}><b>新建文卷</b></button>
					</Link>
				</div>
			)
	}
}

Main.PropTypes = {
	list: React.PropTypes.array.isRequired,
	alert: PropTypes.object.isRequired,
	Qactions: PropTypes.object.isRequired,
	Aactions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	list: state.Questionnarie.list,
	alert: state.Alert
})

const mapDispatchToProps = dispatch => ({
	Qactions: bindActionCreators(QActions, dispatch),
	Aactions: bindActionCreators(AActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)