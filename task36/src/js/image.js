'use strict'

var sys = require('./sys');

function Image () {
	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.img = document.createElement('img');
	this.data = [];
	sys.fileImage.addEventListener('change', this.previewFile.bind(this), false)
};

Image.prototype.previewFile = function() {
	var fr = new FileReader();
	var that = this;

	console.log('imgload');
	fr.addEventListener('load', function(e) {
		that.img.src = this.result;
		that.data = that.getData();
	}, false);
	fr.readAsDataURL(sys.fileImage.files[0]);
};

Image.prototype.getData = function() {
	var width = this.img.naturalWidth;
	var height = this.img.naturalHeight;
	var difWidth = Math.floor(width / 10);
	var difHeight = Math.floor(height / 10);
	var imgParse = [];

	this.canvas.width = width;
	this.canvas.height = height;

	this.ctx.drawImage(this.img, 0, 0);

	for (var i = 0; i < height; i += difHeight) {
		for (var j = 0; j < width; j += difWidth) {
			var imgData = this.ctx.getImageData(j, i, 1, 1).data;
			imgParse.push('build', 'bru rgba('+ imgData[0] + ',' + imgData[1] + ','+ imgData[2] + ', 1)');
		}
	}
	console.log(imgParse);
	return imgParse
}

module.exports = Image;