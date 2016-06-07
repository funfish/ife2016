import React, {Component, PropTypes} from 'react';
import '../../styles/reset.css';
import styles from './home.scss';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<span><b>问卷调查</b></span>
					<span>我的问卷</span>
				</div>
				<div className={styles['container-main']}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

