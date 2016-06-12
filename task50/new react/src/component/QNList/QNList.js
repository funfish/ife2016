import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './QNList.scss';

export default class QNList extends Component {
	render() {
		const {item: {title, deadline, substate}, QActions} = this.props;
		return (
			<li className={styles.clearfix}>
				<input type="radio" value="" />
				<div ref="middle-list" className={styles["middle-list"]}>
					<div className={styles["title-list"]}>{title}</div> 
					<div className={styles["right-list"]}>
					<div className={styles["time-list"]}>{deadline}</div>	
						<div className={styles["state-list"]}>{substate}</div>
						<div className={styles["action-list"]}>
							<button onClick={() => QActions.addNewQN()}>查看数据</button>
							<button onClick={() => QActions.addNewQN()}>删除</button>
							<button onClick={() => QActions.addNewQN()}>编辑</button>
						</div>
					</div>	
				</div>
			</li>
		)
	}
}