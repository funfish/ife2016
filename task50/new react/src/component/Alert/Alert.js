import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AActions from '../../actions/Alert';
import styles from './Alert.scss';


export default class Alert extends Component {
    constructor(props) {
      super(props);
      this.grayStyle = this.grayStyle.bind(this);
      this.remeasure = this.remeasure.bind(this);
    }

	componentDidMount() {
		this.remeasure();
    	window.addEventListener('resize', this.remeasure);
	}

	componentWillUnmount() {
    	window.removeEventListener('resize', this.remeasure);
	}

	remeasure() {
		const rect = ReactDOM.findDOMNode(this.refs["gray-cover"]).getBoundingClientRect(); 
		const {Alert: {left, top, width, height}} = this.props;
		console.log(rect,window.innerWidth, window.innerHeight);
		this.props.AActions.setAlertPosition(left - rect.left, top -rect.top, window.innerWidth, window.innerHeight);						
	}

	grayStyle() {
		const {Alert: {left, top, width, height}} = this.props;
		return {
			left: left, 
			top: top,
			width: width,
			height: height
		}
	}

	render() {
		const {Alert: {content}} = this.props;


		return (
			<div ref="gray-cover" className={styles["gray-cover"]} style={this.grayStyle()}>
				<div className={styles.alert}>
					<div className={styles["alert-heade"]}>
				  		<strong>提示</strong><span className="closebtn">×</span> 
				  	</div>
				  	<ul>
				  		{content.map((item) => <li>{item}</li>)}
				  	</ul>
				  	<div className={styles["alert-choose"]}>
				  		<button className={styles["alert-button"]}>确认</button>
				  		<button className={styles["alert-button"]}>取消</button>
				  	</div>					
				</div>
			</div>
		)
	}
}

const mapStateToProps2 = state => ({
	Alert: state.Alert,
	edit: state.Questionnarie.edit
})

const mapDispatchToProps2 = dispatch => ({AActions: bindActionCreators(AActions, dispatch)})


export default connect(
	mapStateToProps2,
	mapDispatchToProps2
)(Alert)