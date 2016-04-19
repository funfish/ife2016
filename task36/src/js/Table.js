'use strict'

var Node = require('./Node');

//创造table中的节点
function Table(x, y) {
	this.width = x;
	this.height = y;
	this.nodes = this.createcells();
};

Table.prototype.createcells = function(){
	var nodes = new Array(this.height);

	for (var i = 0; i < this.height; i++) {
		nodes[i] = new Array(this.width);
		for (var j = 0; j < this.width; j++) {
			nodes[i][j] = new Node(j, i);
		}
	}
	return nodes
};

Table.prototype.addwall = function(wall) {
	this.nodes[wall.y][wall.x].isWall = true;
};

Table.prototype.target = function() {
	var wrongFlag = true;
	while(wrongFlag) {
		var x = parseInt(Math.random() * 10);
		var y = parseInt(Math.random() * 10);
		if (this.nodes[x][y].isWall === false) {
			wrongFlag = false;
			return this.nodes[y][x]
		}
	}
}

module.exports = Table;