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
	this.table = [];
	this.path = '';
	this.outRang = {
		top: sys.ul1Height + 1,
		bottom: sys.tableHeight + sys.ul1Height - 41,
		lef:  sys.ul2Width + 1,
		right: sys.tableWidth + sys.ul2Width - 41,
	};
	this.top = this.outRang.top;
	this.left = this.outRang.lef;
	this.wrongFlag = false;
}

/**
* 初始化box，创建box
*/
Box.prototype.init = function(table,path) {
	var box = this.box;
	var blueLine = document.createElement('div');

	this.path = path;
	this.table = table;
	box.appendChild(blueLine);
	document.body.appendChild(box);
	util.addClass(box, 'box clearfix');
	util.addClass(blueLine, 'top');
	box.style.position = 'absolute';
	box.style.left =  this.outRang.top + 'px';
	box.style.top =  this.outRang.lef + 1 + 'px';
}

/**
* box移动函数
* @param {num} step 前进的步数
* @param {arry} boxDirNeed 前进需要的方向，是四个数的数组
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
	var tdX = [];
	var tdY = [];


	for (var i = 0; i < step; i++) {
		if (i === 0) {
			tdY[0] = Math.floor(this.top / 40) - 1 + boxDirNeed[2] - boxDirNeed[0];			
			tdX[0] = Math.floor(this.left / 40) - 1 + boxDirNeed[1] - boxDirNeed[3];
		} else {
			tdY[i] = tdY[i- 1] + boxDirNeed[2] - boxDirNeed[0];
			tdX[i] = tdX[i- 1] + boxDirNeed[1] - boxDirNeed[3];			
		}
		if(tdY[i] > 9 || tdY[i] < 0 || tdX[i] > 9 || tdX[i] < 0 || this.table.nodes[tdY[i]][tdX[i]].isWall) {
			this.wrongFlag = true;
			console.log('go wrong');
			break;
		}
	}
/*	if (this.top > that.outRang.bottom) {
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
*/
	if (!this.wrongFlag) {
		this.top += (boxDirNeed[2] - boxDirNeed[0]) * end;
		this.left +=(boxDirNeed[1] - boxDirNeed[3]) * end;
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
		}, 10)
	}

}

/**
* box 在给定旋转方向时，转化为向左向右的次数
* @param {num} degree 需要转到的角度
* @return 向左向右的次数，顺时针为正
*/
Box.prototype.dir = function(degree) {
	var dir = 0;
	var temp = 0;
	var deg = this.deg;

	dir = parseInt((degree - (deg % 360)) / 90);
	if (dir === -3) dir = 1;
	if (dir === 3) dir = -1;
	if (dir === -2) dir = 2;

	return dir	
}

/**
* box旋转函数
* @param {num} dir 需要向左向右的次数
*/
Box.prototype.boxTune = function(dir) {
	var box = this.box;
	var oldDeg = this.deg;
	var end = oldDeg + 90 * dir;
	var startTime = new Date;
	var that = this;
	var temp = end % 360 / 90;

	this.boxDir = [0, 0, 0, 0];
	this.boxDir[temp < 0 ? 4 + temp : temp] = 1;
	this.deg = end;

	var interval2 = setInterval(function() {
		var tempDeg = 0;
		var periodTun = 90 * dir * (new Date - startTime) /500;
		if (abs(periodTun) < abs(90 * dir)) {
			tempDeg = oldDeg + periodTun;	
		} else {
			tempDeg = end;
			clearTimeout(interval2);
		}
		box.style.webkitTransform = 'rotate(' + tempDeg + 'deg)';
		box.style.mozTransform = 'rotate(' + tempDeg + 'deg)';
		box.style.msTransform = 'rotate(' + tempDeg + 'deg)';
		box.style.transform = 'rotate(' + tempDeg + 'deg)';		
	}, 10); 	
}

/**
* 获取所有任务，存在tasks数组里面
*/
Box.prototype.getTasks = function(text)  {
	text = text || sys.textarea.value.split(/\n|\r/g);
	var textLength = text.length;

	for (var i = 0; i < textLength; i++) {
		text[i] = text[i].replace(/^\s*|\s*$/g, '');
		text[i] = text[i].toLowerCase();
		this.tasks.push(text[i]);
	}	
/*
	console.log(text);
	for (var i = 0; i < textLength; i++) {
		text[i] = text[i].replace(/^\s*|\s*$/g, '');
		text[i] = text[i].toLowerCase();
		this.tasks.push(this.taskParse(text[i]));
	}
*/
}

/**
* 解析单个语句，并得出对应的函数处理
* @return 单个task，包括参数，次数，调用函数
*/
Box.prototype.taskParse = function(text) {
	var parse = text.match(/^((mov|tra|tun|go|build)(\s(lef|rig|top|bot|bac))*)(\s\d)*$/) || [,,,,,];
	var task = {
		param: {},
		times: 1,
		callback:'',
	};
	parse[5] = parseInt(parse[5]);
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
			task = this.moveParse(task, parse[5], 0);
			break;

		case 'mov rig':
			task = this.moveParse(task, parse[5], 90);
			break;	

		case 'mov bot':
			task = this.moveParse(task, parse[5], 180);
			break;

		case 'mov lef':
			task = this.moveParse(task, parse[5], -90);
			break;	

		case 'build':
			task.callback = this.build;
			task.param = '';
			task.times = 0.5;
			break;

		default: task = false;
	}
	if (task === false) {
		parse = text.match(/^(bru)\s+(.+)/) || [,,,];
		if (parse[1] === 'bru') {
			task = {
				param: parse[2],
				times: 0.2,
				callback: this.build,
			};
		}
	}	
	if (task === false) {
		parse = text.match(/^(mov\sto)\s+(\d),(\d)$/);
		if (parse[1] === 'mov to') {
			task = this.movTo(parse[2], parse[3]);
		}
	}

	return task
}

Box.prototype.moveParse = function(task, step, degree) {
	if (step !==0) {
		task.callback = [this.boxTune, this.boxGo, this.dir];
		task.times = 2;
		task.param = [degree, step || 1];		
	} else {
		task.callback = [this.boxTune, false, this.dir];
		task.times = 2;
		task.param = [degree, 0];			
	}

	return task
}

Box.prototype.build = function(color) {
	var tdX = Math.floor(this.left / 40) - 1;
	var tdY = Math.floor(this.top / 40) - 1;

	tdY += this.boxDir[2] - this.boxDir[0];
	tdX += this.boxDir[1] - this.boxDir[3];

	if (tdY > 9 || tdY < 0 || tdX > 9 || tdX < 0) {
		this.wrongFlag = true;
	}
	if (color === '') {
		color = color || '#eee';

		if (this.table.nodes[tdY][tdX].isWall) {
			this.wrongFlag = true;
			console.log('不能重复建墙');
		} else {
			setTimeout(function() {
				sys.td[tdX + tdY * 10].style.background ='#eee'; 
			}, 100)	

			this.table.nodes[tdY][tdX].isWall = true;				
		}
	} else {
		if (this.table.nodes[tdY][tdX].isWall) {
			setTimeout(function() {
				sys.td[tdX + tdY * 10].style.background = color; 
			}, 50)				
		} else {
			this.wrongFlag = true;
			console.log('必须先建墙');
		}
	}
}

Box.prototype.movTo = function(targetX ,targetY) {
	var path = this.path;
	targetX = Math.floor(targetX);
	targetY = Math.floor(targetY);

	console.log([this.left, this.top], [targetX ,targetY]);
	var text = path.find(this.table.nodes[Math.floor(this.top / 40) - 1][Math.floor(this.left / 40) - 1],
	 	this.table.nodes[targetY][targetX], (this.deg % 360) / 90);
	console.log(typeof text,text.length);
	var task = [];
	var length = text.length ;

	if (text.length === 0) {
		task = false;
	} else {
		for (var i = 0; i < length; i++) {
			task.push(this.taskParse(text[i]));
		}
	}

	return task
}


Box.prototype.pathError = function() {
	var liCollect = sys.ol.querySelectorAll('li');
	if (this.seq > 1) {
		liCollect[this.seq - 2].style.background = '#D2CBCB';
		if (this.seq < liCollect.length) {
			liCollect[this.seq].style.background = '#D2CBCB';			
		}
	}
	if (this.seq >= 1) {
		liCollect[this.seq - 1].style.background = 'red';		
	}
	this.tasks = [];
	this.seq = 0;
	this.wrongFlag = false;
	sys.textarea.readOnly = false;
	sys.button[0].disabled = false;
	sys.button[1].disabled = false;
	sys.button[2].disabled = false;	

	console.log('路径不对或输入命令错误，超出范围');
}

/**
* 任务执行时候，右边的序列条对应动作
*/
Box.prototype.programScroll = function() {
	var liCollect = sys.ol.querySelectorAll('li');
	liCollect[this.seq].style.background = 'green';
	if (this.seq >= 1) {
		liCollect[this.seq - 1].style.background = '#D2CBCB';
	}
	if (this.seq > 9) {
		sys.textarea.scrollTop = (this.seq - 9) * 20;
	} else {
		sys.textarea.scrollTop = 0;
	}	
}

/**
* 执行输入的任务
*/
Box.prototype.run = function(scroll) {
	var length = this.tasks.length;
	var eachTask = this.taskParse(this.tasks.shift());
	var time = 500 * eachTask.times;
	var that = this;
	var time = 0;
	var timeCell = 0;

	if (eachTask instanceof Array) {
		for (var i = 0, m = eachTask.length; i < m; i++) {
			time += 500 * eachTask[i].times;
		}
	}else {
		time = 500 * eachTask.times;
	}
	if (scroll) {
		this.programScroll();
		console.log(this.wrongFlag);
		console.log(this.seq)
	};
	if (this.wrongFlag) {
		console.log('11')
		this.pathError();
	}else {
		for (var i = 0, m = eachTask.length || 1; i < m; i++) {
				var eachCell = eachTask[i] || eachTask;

				if (eachCell === false) {
					setTimeout(function(){
						console.log(111111111);
						that.wrongFlag = true;
					}, timeCell);
				}
				if (eachCell.times <= 1) {	
					(function(eachOne) {
						setTimeout(eachOne.callback.bind(that, eachOne.param), timeCell)	
					})(eachCell)
									
				};
				if (eachCell.times === 2) {
					(function(eachOne) {
						setTimeout(function() {
							var dir = eachOne.callback[2].call(that, eachOne.param[0]);

							if (dir === 0 && eachOne.param[1] === 0) {
								time -= 1000;
							}else if (dir === 0 || eachOne.param[1] === 0) {
								time -= 500;
							}
							if (dir !== 0) {
								eachOne.callback[0].call(that, dir)
							}	
							if (eachOne.param[1]) {
								setTimeout(eachOne.callback[1].bind(that, eachOne.param[1]), 500);			
							}						
						}, timeCell);						
					})(eachCell)
				};
				timeCell += eachCell.times * 500;
		}
		if (this.tasks.length > 0) {
			if (typeof eachTask === 'object' || eachTask === false) {
				setTimeout(function() {
					if (that.wrongFlag === true) {
						console.log('114',that.seq);
						that.pathError();
					} else {
						that.run.call(that, scroll)
					}
				}, time);	
			} else {
				this.seq = 0;
				sys.textarea.readOnly = false;
				sys.button[0].disabled = false;	
				sys.button[1].disabled = false;
				sys.button[2].disabled = false;	
				this.build =	false;
			}
		} else {
			if (this.wrongFlag === true) {
				console.log("112");
				this.pathError()
			}else {
				setTimeout(function() {
					if (that.wrongFlag === true) {
						that.pathError();
						console.log('113');
					}
					that.seq = 0;
					sys.textarea.readOnly = false;
					sys.button[0].disabled = false;
					sys.button[1].disabled = false;		
					sys.button[2].disabled = false;	
					this.build =	false;
				}, time)			
			}
		}		
	}
	if (scroll) {
		this.seq++;
	};
}

Box.prototype.imageGo = function(data) {
	var imageText = [];
	var dir = 'rig'

	this.top = this.outRang.top;
	this.left = this.outRang.lef;

	if (this.table.nodes[0][0].isWall || this.table.nodes[1][0].isWall) {
		this.wrongFlag = true;
	}

	imageText.push('mov top 0');
	imageText.push('tra bot', data[0], data[1]);

	for (var i = 0; i < 98; i++) {
		if ( i < 89) {
			if ( i % 20 === 9) {
				dir = 'lef';
				imageText.push('tra bot');
			} else if( i % 10 === 9) {
				dir = 'rig';
				imageText.push('tra bot');
			} else {
				imageText.push('tra ' + dir);
			}			
		}else if (i === 89) {
			imageText.push('tun rig', 'tra lef');
		} else if (i > 89) {
			imageText.push('tra lef')
		}
		imageText.push(data[2 * i + 2], data[2 * i + 3]);
	}

	return imageText
}
module.exports = Box;