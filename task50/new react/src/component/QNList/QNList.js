import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './QNList.scss';

export default class QNList extends Component {
    constructor(props) {
      super(props);
      this.deleteConfirm = this.deleteConfirm.bind(this);
    }
	deleteConfirm(id) {
		const {Aactions, Qactions} = this.props;
		Aactions.setAlertContent(['确认要删除此问卷？']);
		Aactions.alertAction([Qactions.deleteQN.bind(this, id)]);
		Aactions.showAlert(true);
	}
	render() {
		const {item: {id, title, deadline, substate}, Qactions} = this.props;
		return (
			<li className={styles.clearfix}>
				<input type="radio" value="" />
				<div ref="middle-list" className={styles["middle-list"]}>
					<div className={styles["title-list"]}>{title}</div> 
					<div className={styles["right-list"]}>
					<div className={styles["time-list"]}>{deadline}</div>	
						<div className={styles["state-list"]}>{substate}</div>
						<div className={styles["action-list"]}>
							<button>查看数据</button>
							<button onClick={() => this.deleteConfirm(id)}>删除</button>
							<Link to="/edit">
								<button onClick={() => Qactions.editQN(id)}>编辑</button>
							</Link>
						</div>
					</div>	
				</div>
			</li>
		)
	}
}

QNList.PropTypes = {
	item: PropTypes.object.isRequired,
	Qactions: PropTypes.object.isRequired,
}