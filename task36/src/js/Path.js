'use strict'

var manhattan = require('./util').manhattan;

/**
* 路径对象
* constructor
* @param {array} table 表格对象
*/
function Path(table){
	this.table = table;
	this.startNode = '';
	this.targetNode = '';
	this.build = false;
};

/**
* 寻找起始位置到终点位置的路径为 Astar方法！
* @param {object} startNode 起始节点
* @param {object} targetNode 结束节点
* @param {num} startDir 起始box的方向
* @return text 返回找到路径分析到的移动命令
*/
Path.prototype.find = function(startNode, targetNode, startDir) {
	this.startNode = startNode;
	this.targetNode = targetNode;

	var openList = [],
		closeList = [],
		successFlag = false,
		endFlag = false,
		neighbors,
		text;

	startNode.h = manhattan(startNode, targetNode);
	startNode.f = startNode.g + startNode.g;
	openList.push(startNode);

	//处理目的地问题
	if (targetNode.isWall || startNode === targetNode) {
		console.log('不可墙上或起始点不可以和终点一致');
		endFlag = true;
		text = [];
	}

	//不断寻址，直到寻的目的地路径
	while(!endFlag) {
		var node = openList.shift();

		node.close = true;
		node.open = false;
		closeList.push(node);
		neighbors = this.findneighbor(node);

		//查询上下左右临近的节点，若非墙非closeList更新g,h,f，加入openList
		for (var i = 0, m = neighbors.length; i < m; i++) {
			var neighbor = neighbors[i];
			if (neighbor.close || neighbor.isWall) continue;
			if (!neighbor.open) {
				neighbor.g = node.g + 1;
				neighbor.h = manhattan(neighbor, targetNode);
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.open = true;
				neighbor.parent = node;
				openList.push(neighbor);
			}
		}

		//对f值由小到大的排序
		openList.sort(function(a, b) {
			return a.f - b.f
		});

		//若目标节点无法到达，openList为空
		if (openList === []) {
			endFlag = true;
		}else if(openList[0].h < 0.2) {
			endFlag = true;
			successFlag = true;
			console.log('find Path success');
			
			//通过获取路径上的每个节点以及对其处理获得任务函数
			text = this.getText(this.success(openList[0]), startDir);
		}
	}
	if (successFlag === true) {
		var list = openList.concat(closeList);
		for (var i = 0, m = list.length; i < m; i++) {
			list[i].g = 0;
			list[i].h = 0;
			list[i].f = 0;
			list[i].isWall = false;
			list[i].close = false;
			list[i].open = false;
		}
	}else {
		text = text || [];
	}

	return text
}

/**
* 寻找me节点附近的节点
* @param {object} me 寻找节点
* @return neighbors 临近的可用节点
*/
Path.prototype.findneighbor = function(me) {
	var neighbors = [];
	var num = 0;
	var table = this.table;

	if (me.y > 0) {
		neighbors[num++] = table.nodes[me.y - 1][me.x];
	}
	if (me.x < table.width - 1) {
		neighbors[num++] = table.nodes[me.y][me.x + 1];
	}
	if (me.y < table.height - 1) {
		neighbors[num++] = table.nodes[me.y + 1][me.x];
	}
	if (me.x > 0) {
		neighbors[num++] = table.nodes[me.y][me.x - 1];
	}

	return neighbors	
}

/**
* 获得寻得路径上的每个节点
* @param {object} targetNode 目标节点
* @return steps 返回每个节点
*/
Path.prototype.success = function (targetNode) {
	var steps = [];
	var temp;
	while (targetNode) {
		steps.unshift([targetNode.x, targetNode.y]);
		temp = targetNode.parent;
		targetNode.parent = '';
		targetNode = temp;
	}
	return steps	
}

/**
* 通过获得节点，起始方向，来得到对应的移动指令
* @param {num} steps 移动的而每个节点
* @param {num} startDir 移动的起始方向
* @return getText 返回寻得路径的移动命令
*/
Path.prototype.getText = function(steps, startDir) {
	var getText = [];
	var nextDir = startDir;
	var preX = this.startNode.x;
	var preY = this.startNode.y;

	for (var  i = 1, m = steps.length; i < m; i++) {
		var dy = preY - steps[i][1];
		var dx = preX - steps[i][0];

		if (dx === 0 && dy === -1) {
			if(nextDir !== 2) {
				getText.push('mov bot 0');
				nextDir = 2;				
			}
			getText.push('go');
		}
		if (dx === 0 && dy === 1) {
			if(nextDir !== 0) {
				getText.push('mov top 0');
				nextDir = 0;				
			}
			getText.push('go');
		}
		if (dx === 1 && dy === 0) {
			if(nextDir !== 3) {
				getText.push('mov lef 0');
				nextDir = 3;
			}
			getText.push('go');
		}
		if (dx === -1 && dy === 0) {
			if(nextDir !== 1) {
				getText.push('mov rig 0');
				nextDir = 1;
			}
			getText.push('go');
		}

		//更新preX，preY
		preX = steps[i][0];
		preY = steps[i][1];
	}

	//建墙阶段，去掉尾部go指令，增加，建墙指令
	if(this.build){
		getText.pop();//到目的地的上一点，方向面对目的地
		getText.push('build');
	}

	return getText
}

module.exports = Path;