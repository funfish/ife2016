'use strict'

var sys = require('./sys');
var util = require('./util');
var abs = Math.abs;
/**
* @constructor
*/
function Box() {
	this.box = document.createElement('div');
	this.boxDir = [1, 0, 0, 0];
	this.deg = 0;
	this.tasks = [];
	this.seq = 0;
	this.outRang = {
		top: sys.ul1Height + 1,
		bottom: sys.tableHeight + sys.ul1Height - 41,
		lef:  sys.ul2Width + 1,
		right: sys.tableWidth + sys.ul2Width - 41,
	};
	this.top = this.outRang.top;
	this.left = this.outRang.lef;
}

Box.prototype.init = function() {
	var box = this.box;
	var blueLine = document.createElement('div');

	box.appendChild(blueLine);
	document.body.appendChild(box);
	util.addClass(box, 'box clearfix');
	util.addClass(blueLine, 'top');
	box.style.position = 'absolute';
	box.style.left =  this.outRang.top + 'px';
	box.style.top =  this.outRang.lef + 1 + 'px';
}

/**
*/
Box.prototype.boxGo = function(step, boxDirNeed) {
	if(step instanceof Array) {
		boxDirNeed = step[1];
		step = step[0];
	};
	step = step || 1;

	var end = 40 * step;
	var box = this.box;
	var startTime = new Date;
	var boxDirNeed = boxDirNeed || this.boxDir;
	var currentTop = this.top;
	var currentLeft = this.left;
	var that = this;

	this.top += (boxDirNeed[2] - boxDirNeed[0]) * end;
	this.left +=(boxDirNeed[1] - boxDirNeed[3]) * end;
	if (this.top > that.outRang.bottom) {
		this.top = that.outRang.bottom;
	}
	if (this.left > that.outRang.right) {
		this.left = that.outRang.right;
	}
	if (this.top < that.outRang.top) {
		this.top = that.outRang.top;
	}
	if (this.left < that.outRang.left) {
		this.left = that.ourRang.left;
	}	

	var interval1 = setInterval(function() {
		var periodGo = 40 * step * (new Date - startTime) / 500;
		if (periodGo < end) {
			box.style.top = currentTop + (boxDirNeed[2] - boxDirNeed[0]) * periodGo + 'px';
			box.style.left = currentLeft + (boxDirNeed[1] - boxDirNeed[3]) * periodGo + 'px';
		} else {
			box.style.top = currentTop + (boxDirNeed[2] - boxDirNeed[0]) * end + 'px';
			box.style.left = currentLeft + (boxDirNeed[1] - boxDirNeed[3]) * end + 'px';
			clearTimeout(interval1);
		}	
		if (box.offsetTop > that.outRang.bottom) {
			box.style.top = that.outRang.bottom + 'px';
		}
		if (box.offsetLeft > that.outRang.right) {
			box.style.left = that.outRang.right + 'px';
		}
		if (box.offsetTop < that.outRang.top) {
			box.style.top = that.outRang.top + 'px';
		}
		if (box.offsetLeft < that.outRang.left) {
			box.style.left = that.ourRang.left + 'px';
		}	
	}, 25)
}

Box.prototype.dir = function(degree) {
	var dir = 0;
	var temp = 0;
	var deg = this.deg;

	if (deg > 0 && degree < 0) {
		degree = -degree;
	} else if (deg < 0 && degree > 0) {
		degree = -degree;
	}
	dir = parseInt((degree - (deg % 360)) / 90);
	if (dir === -3) dir = 1;
	if (dir === 3) dir = -1;

	return dir	
}

Box.prototype.boxTune = function(dir) {
	var box = this.box;
	var oldDeg = this.deg;
	var end = oldDeg + 90 * dir;
	var startTime = new Date;
	var that = this;

	that.boxDir = [0, 0, 0, 0];
	that.boxDir[abs(end % 360 / 90)] = 1;
	that.deg = end;

	var interval2 = setInterval(function() {
		var tempDeg = 0;
		var periodTun = 90 * dir * (new Date - startTime) /500;
		if (abs(periodTun) < abs(90 * dir)) {
			tempDeg = oldDeg + periodTun;	
		} else {
		console.log(1);
			tempDeg = end;
			clearTimeout(interval2);
		}
		box.style.webkitTransform = 'rotate(' + tempDeg + 'deg)';
		box.style.mozTransform = 'rotate(' + tempDeg + 'deg)';
		box.style.msTransform = 'rotate(' + tempDeg + 'deg)';
		box.style.transform = 'rotate(' + tempDeg + 'deg)';		
	}, 25); 	
}


Box.prototype.getTasks = function()  {
	var text = sys.textarea.value.split(/\n|\r/g);
	var textLength = text.length;

	for (var i = 0; i < textLength; i++) {
		text[i] = text[i].replace(/^\s*|\s*$/g, '');
		text[i] = text[i].toLowerCase();
		this.tasks.push(this.taskParse(text[i]));
	}
}

Box.prototype.taskParse = function(text) {
	var parse = text.match(/^((mov|tra|tun|go)(\s(lef|rig|top|bot|bac))*)(\s\d)*$/);
	var task = {
		param: {},
		times: 1,
		callback:'',
	};
	switch (parse[1]) {

		case 'tun lef':
			task.callback = this.boxTune;
			task.param = -1;
			break;

		case 'tun bac':
			task.callback = this.boxTune;
			task.param = 2;
			break;

		case 'tun rig':
			task.callback = this.boxTune;
			task.param = 1;
			break;

		case 'go':
			task.callback = this.boxGo;
			task.param = parse[5] || 1;
			break;

		case 'tra top':
			task.callback = this.boxGo;
			task.param = [parse[5], [1, 0, 0, 0]];
			break;

		case 'tra rig':
			task.callback = this.boxGo;
			task.param = [parse[5], [0, 1, 0, 0]];
			break;

		case 'tra bot':
			task.callback = this.boxGo;
			task.param = [parse[5], [0, 0, 1, 0]];
			break;

		case 'tra lef':
			task.callback = this.boxGo;
			task.param = [parse[5], [0, 0, 0, 1]];
			break;	

		case 'mov top':
			task.callback = [this.boxTune, this.boxGo];
			task.times = 2;
			task.param = [this.dir(0), parse[5]];
			break;

		case 'mov rig':
			task.callback = [this.boxTune, this.boxGo];
			task.times = 2;
			task.param = [this.dir(90), parse[5]];
			break;	

		case 'mov bot':
			task.callback = [this.boxTune, this.boxGo];
			task.times = 2;
			task.param = [this.dir(180), parse[5]];
			break;

		case 'mov lef':
			task.callback = [this.boxTune, this.boxGo];
			task.times = 2;
			task.param = [this.dir(-90), parse[5]];
			break;	

		default: task = false;
	}	
	return task
}

Box.prototype.programScroll = function() {
	var liCollect = sys.ol.querySelectorAll('li');
	liCollect[this.seq].style.background = 'green';
	if (this.seq > 0) liCollect[this.seq - 1].style.background = '#D2CBCB';
	if (this.seq > 9) {
		sys.textarea.scrollTop = (this.seq - 9) * 20;
	} else {
		sys.textarea.scrollTop = 0;
	}	
}

Box.prototype.run = function() {
	var length = this.tasks.length;
	var eachTask = this.tasks.shift();
	var time = 500 * eachTask.times;
	var that = this;

	this.programScroll();
	this.seq++;
	if (eachTask.times === 1) {	
		eachTask.callback.call(this, eachTask.param);
	};
	if (eachTask.times === 2) {
		eachTask.callback[0].call(this, eachTask.param[0]);
		setTimeout(eachTask.callback[1].bind(that, eachTask.param[1]), 500);
	};
	if (this.tasks.length > 0) {
		if (typeof eachTask === 'object') {
			setTimeout(that.run.bind(that), time);	
		} else {
			this.seq = 0;
			sys.textarea.readOnly = false;
			sys.button[0].disabled = false;			
		}
	} else {
		setTimeout(function() {
			that.seq = 0;
			sys.textarea.readOnly = false;
			sys.button[0].disabled = false;			
		}, time)
	}
}

module.exports = Box;