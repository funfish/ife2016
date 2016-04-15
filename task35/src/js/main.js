'use strict'

var sys = require('./sys');
var util = require('./util');
var box = require('./box');
var box = new box();
var ol = sys.ol;

box.init();

util.addEvent('click', sys.button[0], function(e) {
	var liCollect = ol.querySelectorAll('li');
	for (var i = 0, m = liCollect.length; i < m; i++) {
		liCollect[i].style.background = '#D2CBCB';
	}
	sys.textarea.readOnly = true;
	sys.button[0].disabled = true;
	box.getTasks();
	box.run();
});
util.addEvent('keydown', sys.textarea, function(e) {
	var liCollect = ol.querySelectorAll('li');
	var liLength = liCollect.length;
	//延迟技巧，paste触发时候文本内容还是空的，所以延迟0ms-->4ms
	setTimeout(function() {
		var text, textLength;
		text = sys.textarea.value.split(/\n|\r/g);
		textLength = text.length;
		if (liLength < textLength) {
			for (var i = liLength + 1; i <= textLength; i++) {
				var addLi = document.createElement('li');
				addLi.innerHTML = i;
				ol.appendChild(addLi);
			}
		} else if (liLength > textLength) {
			for (var i = liLength - 1; i >= textLength; i--) {
				ol.removeChild(liCollect[i])
			}
		}
	}, 0)
	if (liLength > 9) {
		ol.style.height = 202 + 20 * (liLength - 9) + 'px';
	}
});
util.addEvent('click', sys.button[1], function() {	
	var li = document.createElement('li');
	li.innerHTML = 1;
	ol.innerHTML = '';
	ol.appendChild(li);
	sys.textarea.readOnly = false;
	sys.textarea.value = ''; 

	box.boxDir = [1, 0, 0, 0];
	box.deg = 0;
	box.tasks = [];
	box.box.style.left =  box.outRang.top + 'px';
	box.box.style.top =  box.outRang.lef + 'px';
	
	box.box.style.webkitTransform = 'rotate(' + box.deg + 'deg)';
	box.box.style.mozTransform = 'rotate(' + box.deg + 'deg)';
	box.box.style.msTransform = 'rotate(' + box.deg + 'deg)';
	box.box.style.transform = 'rotate(' + box.deg + 'deg)';
	box.top = box.outRang.top;
	box.left = box.outRang.lef;
})
util.wheel(sys.textarea, function(delta){
	if (delta > 0) {
		if (ol.offsetTop < -120) {
			ol.style.top = ol.offsetTop + delta + 'px';		
		} else {
			ol.style.top = 0;
		}			
	} else {
		var olBottom = - parseInt(util.getCss(ol, 'height')) + 322;
		if (ol.offsetTop > olBottom) {
			ol.style.top = ol.offsetTop + delta + 'px';
		} else {
			ol.style.top = olBottom - 120 + 'px';
		}				
	}
});
util.addEvent('scroll', sys.textarea, function(e) {
	ol.style.top = -sys.textarea.scrollTop + 'px';
});