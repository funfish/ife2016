'use strict'

var sys = require('./sys');

/**
* 图像构造函数
* constructor
*/
function Image () {
	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.img = document.createElement('img');
	this.data = [];
	sys.fileImage.addEventListener('change', this.previewFile.bind(this), false)
};

/**
* 选择图像，触发change事件，时候调用，为监听load事件
*/
Image.prototype.previewFile = function() {
	var fr = new FileReader();
	var that = this;

	console.log('imgload');

	//监听load事件，图片加载完后，处理
	fr.addEventListener('load', function(e) {
		that.img.src = this.result;
		that.data = that.getData();
	}, false);
	fr.readAsDataURL(sys.fileImage.files[0]);//readAsDataURL读取图片地址
};

/**
* 加载成功后，获取图像信息
* @return imaParse 分析图像后的数据，以 'build','bru rgba(,,,1)'的子节
*/
Image.prototype.getData = function() {
	var width = this.img.naturalWidth;
	var height = this.img.naturalHeight;
	var difWidth = Math.floor(width / 10);
	var difHeight = Math.floor(height / 10);
	var imgParse = [];

	this.canvas.width = width;
	this.canvas.height = height;

	//通过canvas画布获得图像像素级别的信息
	this.ctx.drawImage(this.img, 0, 0);

	//由于数据较大，仅获取每个[difWidth，difHeight]第一个点的像素信息，有待改进
	for (var i = 0; i < height; i += difHeight) {
		for (var j = 0; j < width; j += difWidth) {
			var imgData = this.ctx.getImageData(j, i, 1, 1).data;
			imgParse.push('build', 'bru rgba('+ imgData[0] + ',' + imgData[1] + ','+ imgData[2] + ', 1)');
		}
	}

	return imgParse
}

module.exports = Image;