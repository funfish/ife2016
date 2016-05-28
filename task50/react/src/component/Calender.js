import React, { Component } from 'react'
import ReactDom from 'react-dom'

export default class Calender extends Component {
    constructor(props) {
      super(props);
      let date = new Date();
      this.state = {
      	year: date.getFullYear(),
      	month: date.getMonth(),
      	day: date.getDate(),
      	week: date.getDay()
      }
    }	
	freDay(year) {
		return (year % 4) == 0 && (year % 100) != 0 || (year % 400) ==0 ? 29 : 28
	}

	monthDay(month) {
		return month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31
	}
	days(year, month) {
		return month === 1 ? this.freDay(year) : this.monthDay(month + 1);
	}

	monthChange(day, allDay, dir) {
		const week = allDay % 7;
		const newMonth = this.state.month + dir;
		if (newMonth >= 0 && newMonth < 12) {
			this.setState({
				month: newMonth,
				day: day,
				week: week
			})
		} else if(newMonth > 11) {
			this.setState({
				year: this.state.year + 1,
				month: 0,
				day: day,
				week: week 
			})
		} else if(newMonth < 0) {
			this.setState({
				year: this.state.year - 1,
				month: 11,
				day: day,
				week: week  
			})
		}
	}

	timeShow(year, month, day, dir) {
		let newMonth = month + dir + 1;
		if(newMonth <= 0) {
			newMonth = 12
		}
		if(newMonth > 12) {
			newMonth = 1;
		}
		console.log(year, newMonth, day,dir,  'child')
		this.props.value(year, newMonth, day)
	}

	clickDouble(year, month, daycurrent, n, dir) {
		this.timeShow(year, month, daycurrent, dir);
		this.monthChange(daycurrent, n + 1, dir)
	}

	render() {
		const monthes= ['一', '二', '三', '四', '五', '六', '七', '八', 
						'九', '十', '十一', '十二'];
		const weekPreNext = [1, 0, 6, 5, 4, 3, 2];
		let { year, month, day, week } = this.state;
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
					calenderMain.push(<li onClick={this.timeShow.bind(this, year, month, showArray[n], 0)}>{showArray[n]}</li>)
				} else if (dayPreShow > n){
					calenderMain.push(<li className="gray" onClick={this.clickDouble.bind(this, year, month, showArray[n], n, -1)}>{showArray[n]}</li>)
				} else {
					calenderMain.push(<li className="gray" onClick={this.clickDouble.bind(this, year, month, showArray[n], n, 1)}>{showArray[n]}</li>)
				}
				n++;
			}
		}
		const monthPreFirst = weekPreNext[(dayPre - dayPreShow) % 7];
		const monthNextFirst = showNextmonthDay % 7 + 1;

		return (
			<div id="calender">
				<img src="../src/img/arrow.png" />
				<div id="calHeader">
					<span className="monthSpace">{monthes[month]}月</span>{year}
					<img src="../src/img/left.png" id="leftImg" onClick={this.monthChange.bind(this, 1, monthPreFirst, -1)} />
					<img src="../src/img/right.png" id="rightImg" onClick={this.monthChange.bind(this, 1, monthPreFirst, 1)} />
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
		)
	}
}