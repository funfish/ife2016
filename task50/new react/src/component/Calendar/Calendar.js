import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CActions from '../../actions/Calender';
import styles from './Calender.scss';

export default class Calender extends Component {
    constructor(props) {
      	super(props);
       	this.days = this.days.bind(this);
       	this.dayChange = this.dayChange.bind(this);
       	this.timeShow = this.timeShow.bind(this);
    }	

	freMouthDay(year) {
		return (year % 4) == 0 && (year % 100) != 0 || (year % 400) ==0 ? 29 : 28
	}

	monthDay(month) {
		return month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31
	}
	days(year, month) {
		return month === 1 ? this.freMouthDay(year) : this.monthDay(month + 1);
	}

	dayChange(newDay, allDay, dir) {
		let {calenderShow, year, month, day, week, CActions} = this.props;
		const newWeek = allDay % 7;
		const newMonth = this.state.month + dir;
		if (newMonth >= 0 && newMonth < 12) {
			CActions.setCalender(year, newMonth, newWeek, newDay)
		} else if(newMonth > 11) {
			CActions.setCalender(year + 1, 0, newWeek, newDay)
		} else if(newMonth < 0) {
			CActions.setCalender(year - 1, 11, newWeek, newDay)
		}
	}

	timeShow(newDay, allDay) {
		dayChange(newDay, allDay, 0);
		this.props.CActions.setDeadLine()
	}

	clickDouble(year, month, daycurrent, n, dir) {
		this.timeShow(year, month, daycurrent, dir);
		this.dayChange(daycurrent, n + 1, dir)
	}

	render() {
		let {calenderShow, deadLine, year, month, day, week, CActions} = this.props;

		const monthes= ['一', '二', '三', '四', '五', '六', '七', '八', 
						'九', '十', '十一', '十二'];
		const weekPreNext = [1, 0, 6, 5, 4, 3, 2];
		let weekChange = week === 0 ? 7 : week;
		const dayNow = this.days(year, month);
		const dayPre = month === 0 ? 31 : this.days(year, month - 1);
		const dayNext = month === 11 ? 31 : this.days(year, month + 1);
		let dayPreShow = day - weekChange >= 0 ? 7 - (day - weekChange) % 7 : weekChange -day;
		let dayNexShow = (7 - (dayNow - (day + (7 - weekChange))) % 7) % 7;
		let showArray = [];
		const showNextmonthDay = dayPreShow + dayNow;

		if(showNextmonthDay <= 35) {
			dayNexShow += 7;
		}
		for (let i = dayPre - dayPreShow + 1; i <= dayPre; i++) {
			showArray.push(i);
		}

		for (let i = 1; i <= dayNow; i++) {
			showArray.push(i);
		}

		for (let i = 1; i <= dayNexShow; i++) {
			showArray.push(i);
		} 
		let calenderMain = [];
		let n = 0;
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 7; j++) {
				if(dayPreShow <= n && n < showNextmonthDay) {
					calenderMain.push(<li onClick={this.timeShow.bind(this, showArray[n], n + 1)}>{showArray[n]}</li>)
				} else if (dayPreShow > n){
					calenderMain.push(<li className="gray" onClick={this.dayChange.bind(this, 1, monthNextFirst, 1)}>{showArray[n]}</li>)
				} else {
					calenderMain.push(<li className="gray" onClick={this.dayChange.bind(this, 1, monthPreFirst, -1)}>{showArray[n]}</li>)
				}
				n++;
			}
		}
		const monthPreFirst = weekPreNext[(dayPre - dayPreShow) % 7];
		const monthNextFirst = showNextmonthDay % 7 + 1;

		return (
			<label htmlFor="deadline">问卷截止日期</label>
			<div id="timeShow" onClick={() => CActions.showCalender()} >{deadline}</div>
			{calenderShow && 
				<div id="calender">
				<img src="../src/img/arrow.png" />
				<div id="calHeader">
					<span className="monthSpace">{monthes[month]}月</span>{year}
					<img src="../src/img/left.png" id="leftImg" onClick={this.dayChange.bind(this, 1, monthPreFirst, -1)} />
					<img src="../src/img/right.png" id="rightImg" onClick={this.dayChange.bind(this, 1, monthNextFirst, 1)} />
					<ul className="clearfix">
						<li>
							Mon
						</li>
						<li>
							Tue
						</li>
						<li>
							Wed
						</li>
						<li>
							Thu
						</li>
						<li>
							Fri
						</li>
						<li>
							Sai
						</li>
						<li>
							Sun
						</li>
					</ul>	
				</div>
				<ul id="calMain" className="clearfix">
					{calenderMain}
				</ul>
				</div>
			}
		)
	}
}

const mapStateToProps = state => (Calender: state.Calender)

const mapDispatchToProps = dispatch => ({CActions: bindActionCreators(CActions, dispatch)})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit)