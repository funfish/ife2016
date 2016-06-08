import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as QActions from '../../actions/Questionnarie';
import styles from './Edit.scss';

class Edit extends Component {
    constructor(props) {
      super(props);
      this.changeTitleQN = this.changeTitleQN.bind(this);
    }
	changeTitleQN() {
		this.props.Qactions.setTitleQN(ReactDOM.findDOMNode(this.refs["title-input"]).value)
	}

	render() {

		let {list, edit, addChoose, Qactions} = this.props;
	    return (
			<div className={styles["container-center"]}>
				<div className={styles["title-QN"]}>
					<input type="text" ref="title-input" className={styles["title-input"]} defaultValue={`${edit.title}`} onBlur={this.changeTitleQN} />
				</div>
				<div className={styles["add-footer"]}>
					{addChoose && <div className={styles["button-box"]}>
						<div className={styles["add-center"]}>
							<button className={styles["button-add"]} ><img src='../../src/img/QN单选.png' />单选</button>
							<button className={styles["button-add"]} ><img src='../../src/img/QN多选.png' />多选</button>
							<button className={styles["button-add"]} ><img src='../../src/img/QN文本.png' />文本题</button>
						</div>
					</div>	
					}
					<div className={styles["add-item"]} onClick={() =>Qactions.addChoose()}>
						<div className={styles["add-center"]}>
							<img src='../../src/img/QN加号.png' /> 添加问题
						</div>
					</div>
				</div>
			</div>	
	    )
	}
}

const mapStateToProps = state => ({
	list: state.Questionnarie.list,
	edit: state.Questionnarie.edit.content,
	addChoose: state.Questionnarie.edit.addChoose
})

const mapDispatchToProps = dispatch => ({Qactions: bindActionCreators(QActions, dispatch)})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit)
