var manhattan = require('./util').manhattan;

function Path(table){
	this.table = table;
	this.startNode = '';
	this.targetNode = '';
	this.build = false;
};

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
	if (targetNode.isWall) {
		console.log('不可墙上');
		endFlag = true;
		text = [];
	}

	while(!endFlag) {
		var node = openList.shift();

		node.close = true;
		node.open = false;
		closeList.push(node);
		neighbors = this.findneighbor(node);
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
		openList.sort(function(a, b) {
			return a.f - b.f
		});
		console.log(openList[0]);
		if (openList === []) {
			endFlag = true;
		}else if(openList[0].h < 0.2) {
			endFlag = true;
			successFlag = true;
			console.log('success');
			if (openList) {
				text = this.getText(this.success(openList[0]), startDir);
				console.log(text);
			} else {
				text = [];
			}
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
//边早边发现邻居
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
		preX = steps[i][0];
		preY = steps[i][1];
	}

	if(this.build){
		getText.pop();//到目的地的上一点，方向面对目的地
		getText.push('build');
	}

	return getText
}
Path.prototype.bulidPath = function(targetNode) {
	var neighbors = this.findneighbor(targetNode);

	for (var i = 0, m = neighbors.length; i < m; i++) {
		var neighbor = neighbors[i];
		if (neighbor.close || neighbor.isWall) continue;
		if (!neighbor.open) {


		}
	}
}
module.exports = Path;