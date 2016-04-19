//节点函数
function Node(x, y) {
	this.x = x;
	this.y = y;
	this.g = 0;
	this.h = 0;
	this.f = 0;
	this.parent = '';
	this.isWall = false;
	this.close = false;
	this.open = false;
}

module.exports = Node;