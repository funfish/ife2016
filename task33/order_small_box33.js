(function() {
	//函数定义
	var addClass = function(el, newClassName) {
		el.className += '' + newClassName;
	}
	// 移除element中的样式oldClassName
	var removeClass = function(el, oldClassName) {
	    el.className = el.className.replace(/oldClassName/,'')
	}
	var getCss = function(o, key){
	    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
	}
	//强行ie8
	function addEvent(evnt, elem, func) {
	   if (elem.addEventListener)  // W3C DOM
	      elem.addEventListener(evnt,func,false);
	   else if (elem.attachEvent) { // IE DOM
	      elem.attachEvent("on"+evnt, func);
	   }
	   else { // No much to do
	      elem[evnt] = func;
	   }
	}
	//初始化变量模块
	var box = document.createElement('div');
	var blueLine = document.createElement('div');
	var table = document.querySelector('table');
	var ul = document.querySelectorAll('ul');
	var input = document.querySelector('input');
	var button = document.querySelector('button');
	var td = document.querySelector('td');
	var tableHeight = (parseInt(getCss(table, 'height'))||(parseInt(getCss(td, 'height')) + 1) * 10) + 2;
	var tableWidth = (parseInt(getCss(table, 'width'))||(parseInt(getCss(td, 'width')) + 1) * 10) +2;
	var ul1Height =  parseInt(getCss(ul[0], 'height'));
	var ul2Width =  parseInt(getCss(ul[1], 'width'))
	var text = '';
	var newDir = 0;

	box.appendChild(blueLine);
	document.body.appendChild(box);
	addClass(box, 'box clearfix');
	addClass(blueLine, 'top');
	box.style.left = ul2Width + tableHeight / 2 + 'px';
	box.style.top =  ul1Height + tableWidth / 2 + 'px';

	//现在方向
	var boxDir = [1, 0, 0, 0];
	//专门对go处理
	var boxGo = function() {
		box.style.top = 40 * (boxDir[2] - boxDir[0])+ box.offsetTop + 'px';
		box.style.left = 40 * (boxDir[1] - boxDir[3]) + box.offsetLeft + 'px';
		if (box.offsetTop > tableHeight + ul1Height) box.style.top = tableHeight + ul1Height - 40 + 'px';
		if (box.offsetLeft > tableWidth + ul2Width) box.style.left = tableWidth + ul2Width - 40 + 'px';
		if (box.offsetTop < ul1Height) box.style.top = ul1Height + 'px';
		if (box.offsetLeft < ul2Width) box.style.left = ul2Width + 'px';
	}
	//获取当前方向，本来想用rotate。。。IE8不支持
	var setDir = function(dir) {
		boxDir = [0, 0, 0, 0];
		dir = parseInt(dir);
		newDir += + dir;
		if (newDir > 3) newDir -= 4;
		if (newDir < 0) newDir += 4;
		boxDir[newDir] = 1;
		blueLine.className = '';
		switch (newDir) {
			case 0:
				addClass(blueLine, 'top');
				break;
			case 1:
				addClass(blueLine, 'right');
				break;
			case 2:
				addClass(blueLine, 'bottom');
				break;
			case 3:
				addClass(blueLine, 'left');
				break;
			default: ;
		}
	}
	var run = function(order) {
		switch (order) {
			case 'go':
				boxGo();
				break;

			case 'tun lef':
				setDir(-1);
				break;

			case 'tun bac':
				setDir(2);
				break;

			case 'tun rig':
				setDir(1)
				break;	
			default:;
		}
	}
	//读取输入内容
	addEvent('click', button, function() {
		text = input.value.replace(/^\s*|\s*$/, '');
		text = text.toLowerCase();
		run(text);
		input.value = '';
	})
})()