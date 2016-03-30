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
	var ul2Width =  parseInt(getCss(ul[1], 'width'));
	var then = 0;
	var deg = 0;
	var interval = 500;
	var accumulate = 0;
	var stepTop = 0;
	var stepLeft = 0;
	var boxTop = 0;
	var boxLeft = 0;
	var text = '';
	var newDir = 0;

	//为了画IE8下的table边框

	box.appendChild(blueLine);
	document.body.appendChild(box);
	addClass(box, 'box clearfix');
	addClass(blueLine, 'top');
	box.style.position = 'absolute';
	box.style.left = ul2Width + tableWidth / 2 + 'px';
	box.style.top =  ul1Height + tableHeight / 2 + 'px';
	//现在方向分别为上，右，下，左
	var boxDir = [1, 0, 0, 0];
	//专门对go处理
	var boxGo = function() {
	    var now = new Date();
	    var period = now - then;
	    if (window.requestAnimationFrame) {	    
			stepTop += 40 * (boxDir[2] - boxDir[0]) * period / interval;
			stepLeft += 40 * (boxDir[1] - boxDir[3]) * period / interval;
			box.style.top = stepTop + boxTop + 'px';
			box.style.left = stepLeft + boxLeft + 'px';		
			then = now;
			accumulate += period;
			if (accumulate < interval) {
				requestAnimationFrame(boxGo.bind(this));
			} else {
				stepTop = 0;
				stepLeft = 0;
				accumulate = 0;
				box.style.top = 40 * (boxDir[2] - boxDir[0]) + boxTop + 'px';
				box.style.left = 40 * (boxDir[1] - boxDir[3]) + boxLeft + 'px';
			}
		} else {
			box.style.top = 40 * (boxDir[2] - boxDir[0])+ box.offsetTop + 'px';
			box.style.left = 40 * (boxDir[1] - boxDir[3]) + box.offsetLeft + 'px';			
		}
		if (box.offsetTop > tableHeight + ul1Height) box.style.top = tableHeight + ul1Height - 40 + 'px';
		if (box.offsetLeft > tableWidth + ul2Width) box.style.left = tableWidth + ul2Width - 40 + 'px';
		if (box.offsetTop < ul1Height) box.style.top = ul1Height + 'px';
		if (box.offsetLeft < ul2Width) box.style.left = ul2Width + 'px';		
	}
	//旋转函数
	function rotate (dir) {
	    var now = new Date();
	    var period = now - then;
	    if (window.requestAnimationFrame) {
			accumulate += period;
			deg += dir * 90 * period /interval;
			then = now;
			box.style.webkitTransform = 'rotate(' + deg + 'deg)';
			box.style.mozTransform = 'rotate(' + deg + 'deg)';
			box.style.msTransform = 'rotate(' + deg + 'deg)';
			box.style.transform = 'rotate(' + deg + 'deg)';
			if (accumulate < interval){
				requestAnimationFrame(rotate.bind(this, dir));
			} else {
				//修正偏差
				deg = parseInt(deg / 10) * 10;
				box.style.transform = 'rotate(' + deg + 'deg)';
				accumulate = 0;
			}	    	
	    } else {//支持IE8
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

	}
	//获取当前方向，本来想用rotate。。。IE8不支持
	var setDir = function(dir) {
		then = new Date();
		boxDir = [0, 0, 0, 0];
		dir = parseInt(dir);
		newDir += + dir;
		if (newDir > 3) newDir -= 4;
		if (newDir < 0) newDir += 4;
		boxDir[newDir] = 1;
		rotate(dir);
	}
	var run = function(order) {
		switch (order) {
			case 'go':
				boxLeft = box.offsetLeft;
				boxTop = box.offsetTop;
				then = new Date();
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
	//读取输入内容,ie8
	addEvent('click', button, function() {
		text = input.value.replace(/^\s*|\s*$/, '');
		text = text.toLowerCase();
		run(text);
		input.value = '';
	})
})()