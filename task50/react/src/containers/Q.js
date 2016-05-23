import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import ListQNsItem from '../component/ListQNsItem'
import Alert from '../component/Altert'

export default class QN extends Component {
	render() {
		return (
			<div id="containerMain" className="clearfix">
				<div className="header">
					<span><b>问卷调查</b></span>
					<span>我的问卷</span>
				</div>
				<div id="containerListQNs">
					{this.props.children}
				</div>
			</div>
		)
	}
}
