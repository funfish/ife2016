import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as QActions from '../../actions/Questionnarie';
import Question from '../../component/Question/Question';
import Calendar from '../../component/Calendar/Calendar';
import Alert from '../../component/Alert/Alert';
import * as AActions from '../../actions/Alert';
import styles from './Edit.scss';

class Edit extends Component {
    constructor(props) {
      super(props);
      this.changeTitleQN = this.changeTitleQN.bind(this);
      this.subClickHandler = this.subClickHandler.bind(this);
    }
	changeTitleQN() {
		this.props.Qactions.setTitleQN(ReactDOM.findDOMNode(this.refs["title-input"]).value)
	}

	subClickHandler() {
		const {list, edit, calendar, addChoose, Qactions, Aactions} = this.props;
		let content, onAClick;
		if (calendar.deadline === '')	{
			Aactions.setAlertContent(['请选择发布日期']);
			Aactions.alertAction([]);
		}else {
			if (edit.complete) {
				Aactions.setAlertContent(['是否发布此卷？', '发布日期' + calendar.deadline]);				
				Aactions.alertAction([Qactions.setDeadlineQN.bind(this, calendar.deadline), Qactions.saveQN, Qactions.substateQN]);
			} else {
				Aactions.setAlertContent(['点击确定，就保存问卷并发布？', '发布日期' + calendar.deadline]);
				Aactions.alertAction([Qactions.setDeadlineQN.bind(this, calendar.deadline), Qactions.saveQN, Qactions.substateQN]);
			}
		}
		Aactions.showAlert(true)
	}


	render() {

		const {list, edit, alert: {show}, addChoose, calendar, Qactions} = this.props;
		console.log(1111);
	    return (
			<div className={styles["container-center"]}>
				{show && <Alert />}
				<div className={styles["title-QN"]}>
					<input type="text" ref="title-input" className={styles["title-input"]} defaultValue={`${edit.title}`} onBlur={this.changeTitleQN} />
				</div>
				{edit.contentQs.map((item, i) => <Question key={i} question={item} sequence={i+1} Qactions={Qactions}/>)}
				<div className={styles["add-footer"]}>
					{addChoose && <div className={styles["button-box"]}>
						<div className={styles["add-center"]}>
							<button className={styles["button-add"]} onClick={() => Qactions.addNewQ(0)}><img src='../../src/img/QN单选.png' />单选</button>
							<button className={styles["button-add"]} onClick={() => Qactions.addNewQ(1)}><img src='../../src/img/QN多选.png' />多选</button>
							<button className={styles["button-add"]} onClick={() => Qactions.addNewQ(2)}><img src='../../src/img/QN文本.png' />文本题</button>
						</div>
					</div>	
					}
					<div className={styles["add-item"]} onClick={() => Qactions.addChoose()}>
						<div className={styles["add-center"]}>
							<img src='../../src/img/QN加号.png' /> 添加问题
						</div>
					</div>
				</div>
				<div className={styles["footer-QN"]}>
					<Calendar />
					<button className={styles["button-check"]} onClick={() => this.subClickHandler()}>发布问卷</button>
					<button className={styles["button-check"]} onClick={() => (Qactions.setDeadlineQN(calendar.deadline), Qactions.saveQN())}>保存问卷</button>
				</div>
			</div>	
	    )
	}
}

const mapStateToProps = state => ({
	list: state.Questionnarie.list,
	edit: state.Questionnarie.edit,
	addChoose: state.Questionnarie.addChoose,
	alert: state.Alert,
	calendar: state.Calendar
})

const mapDispatchToProps = dispatch => ({
	Qactions: bindActionCreators(QActions, dispatch),
	Aactions: bindActionCreators(AActions, dispatch)
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit)
