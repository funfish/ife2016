'use strict'

var Node = require('./Node');

/**
* 表格构造函数
* constructor
* @param {num} x 表格宽度
* @param {num} y 表格高度
*/
function Table(x, y) {
	this.width = x;
	this.height = y;
	this.nodes = this.createcells();
};

/**
* 创建表格
* @return nodes 返回表格对象数组
*/
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

/**
* 表格内增加墙 //尚未开发，有待改进，不影响程序
* @param {object} wall 墙对象
*/
Table.prototype.addwall = function(wall) {
	this.nodes[wall.y][wall.x].isWall = true;
};

/**
* 表格内目标节点函数生成器
* @return {object} nodes 返回非墙节点
*/
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