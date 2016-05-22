import React, { Component } from 'react'

let Button = React.createClass({
    getInitialState() {
        return { hoveredBu: false }
    },
  	mouseOverHandlerBu() {
    	this.setState({ hoveredBu: true })
  	},
  	mouseOutHandlerBu() {
    	this.setState({ hoveredBu:false });
  	},
  	styleBu() {
  		if(this.state.hoveredBu) {
  			return { backgroundColor: "#e80", color: "white"}
  		} else {
  			return { backgroundColor: "white", color: "black" }
  		}
  	},
  	render() {
  		return (
	  		<button onClick={this.props.onAcClick} onMouseOver={this.mouseOverHandlerBu} onMouseOut={this.mouseOutHandlerBu} style={this.styleBu()}>
	  		{this.props.value}
	  		</button>
  		)
  	}
})

export default Button