'use strict'

var util = require('./util');
var getCss = util.getCss;
var sys = {
	table: document.querySelector('table'),
	ul: document.querySelectorAll('ul'),
	input: document.querySelector('input'),
	button: document.querySelectorAll('button'),
	td: document.querySelectorAll('td'),
	textarea: document.querySelector('textarea'),
	ol: document.querySelector('ol'),
	fileImage: document.getElementById("fileImage"),
	tableHeight: 403,
	tableWidth: 403,
	ul1Height:  40,
	ul2Width: 40
}

module.exports = sys;