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
	//强行ie8事件绑定
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
	//恶心的滚轮事件
	var wheel = function(obj, callback) {
		var wheelType = 'mousewheel';
		var foxFlag = false;
	   	try {
	   		document.createEvent("MouseScrollEvents");
	   		foxFlag = true;
	   		wheelType = "DOMMouseScroll";
	   	} catch(e) {}
	    addEvent(wheelType, obj, function(e) {
	    	var delta = 0;
			e = e || window.event;
			if (!foxFlag) {
				delta = e.wheelDelta ;
			} else {
				delta = - e.delta * 40;
			}
			callback(delta);
	    })
	}
	//初始化变量模块
	var box = document.createElement('div');
	var blueLine = document.createElement('div');
	var table = document.querySelector('table');
	var ul = document.querySelectorAll('ul');
	var input = document.querySelector('input');
	var button = document.querySelectorAll('button');
	var td = document.querySelector('td');
	var tableHeight = (parseInt(getCss(table, 'height'))||(parseInt(getCss(td, 'height')) + 1) * 10) + 2;
	var tableWidth = (parseInt(getCss(table, 'width'))||(parseInt(getCss(td, 'width')) + 1) * 10) +2;
	var ul1Height =  parseInt(getCss(ul[0], 'height'));
	var ul2Width =  parseInt(getCss(ul[1], 'width'));
	var then = 0;
	var deg = 0;
	var targetDeg = 0;
	var interval = 500;
	var accumulate = 0;
	var stepTop = 0;
	var stepLeft = 0;
	var boxTop = 0;
	var boxLeft = 0;
	var text = []; //获取到的文本信息
	var textLength = 0;//输入文本的长度
	var seq = 0;//程序进行时候的顺序
	var overFlag = false;//结束某一步标志
	var nStep = 0;//一条语句中n的大小
	var nLiStep = 0;//避免n的时候数列标示下移
	var nLiStepAll = 0;
	var newDir = 0;
	var wrongFlag = 0;


	var textarea = document.querySelector('textarea');
	var ol = document.querySelector('ol');

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
	var preDir = [1, 0, 0, 0];
	//专门对go处理
	var boxGo = function() {
	    var now = new Date();
	    var period = now - then;
	    overFlag = false;
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
				overFlag = true;
			}
		} else {
			box.style.top = 40 * (boxDir[2] - boxDir[0])+ box.offsetTop + 'px';
			box.style.left = 40 * (boxDir[1] - boxDir[3]) + box.offsetLeft + 'px';			
			overFlag = true;
			console.log(110)
		}
		if (box.offsetTop > tableHeight + ul1Height - 41) box.style.top = tableHeight + ul1Height - 41 + 'px';
		if (box.offsetLeft > tableWidth + ul2Width - 41) box.style.left = tableWidth + ul2Width - 41 + 'px';
		if (box.offsetTop < ul1Height + 1) box.style.top = ul1Height + 1 + 'px';
		if (box.offsetLeft < ul2Width + 1) box.style.left = ul2Width + 1 + 'px';		
		if (overFlag) {
			//添加该语句中n表示的次数
			if (!wrongFlag && nStep > 0) {
				for (var i = 1; i <= nStep; i++) {
					text.splice(seq + i, 0, 'go');
				}
				textLength += nStep;
				nLiStep = nStep;
				nLiStepAll += nLiStep;
				nStep = 0;
			}
			//触发下一步
			if (++seq < textLength) {
				run(text[seq]) 
			} else {
				textarea.readOnly = false;
				button[0].disabled = false;		
			}
		}
	}
	//旋转函数
	function rotate (dir) {
	    var now = new Date();
	    var period = now - then;

	    overFlag = false;
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
				deg = targetDeg;
				box.style.transform = 'rotate(' + deg + 'deg)';
				accumulate = 0;
				overFlag = true;
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
			overFlag = true;  	
	    }
		if (overFlag) {
			//添加该语句中n表示的次数
			if (!wrongFlag && nStep > 0) {
				for (var i = 1; i <= nStep; i++) {
					text.splice(seq + i, 0, 'go');
				}
				textLength += nStep;
				nLiStep = nStep;
				nLiStepAll += nLiStep;
				nStep = 0;
			}
			//触发下一步
			if (++seq < textLength) {
				run(text[seq]) 
			} else {
				textarea.readOnly = false;
				button[0].disabled = false;		
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
		targetDeg += 90 * dir;
		rotate(dir);
	}
	//mov动作时候的预处理函数
	var mov = function(degree) {
		var dir = 0;
		var temp = 0;
		if (deg > 0 && degree < 0) {
			degree = -degree;
		} else if (deg < 0 && degree > 0) {
			degree = -degree;
		}
		dir = parseInt((degree - (deg % 360)) / 90);
		if (dir === -3) dir = 1;
		if (dir === 3) dir = -1;

		return dir		
	}
	var run = function(order) {
		var liCollect = ol.querySelectorAll('li');
		var dir = 0;
		if (nLiStep === 0) {
			programScroll()
		} else {
			nLiStep--;
		}
		if (text[seq] !== '') {
			nStep = order.match(/\s\d+/g) || ['0'];
			nStep = parseInt(nStep[0]);

			if (nStep > 0) order = order.match(/[^\d]+/g)[0].replace(/^\s*|\s*$/g, ''); 
			boxLeft = box.offsetLeft;
			boxTop = box.offsetTop;
			then = new Date();
			preDir = boxDir;

			switch (order) {
				case 'tun lef':
					setDir(-1);
					break;

				case 'tun bac':
					setDir(2);
					break;

				case 'tun rig':
					setDir(1)
					break;

				case 'mov top':
					setDir(mov(0));
					break;

				case 'mov rig':
					setDir(mov(90));
					break;

				case 'mov bot':
					setDir(mov(180));
					break;

				case 'mov lef':
					setDir(mov(-90));
					break;	

				case 'tra top':
					boxDir = [1, 0, 0, 0];
					boxGo();
					break;

				case 'tra rig':
					boxDir = [0, 1, 0, 0];
					boxGo();
					break;

				case 'tra bot':
					boxDir = [0, 0, 1, 0];
					boxGo();
					break;

				case 'tra lef':
					boxDir = [0, 0, 0, 1];
					boxGo();
					break;

				case 'go':
					boxGo();
					break;		

				default:
					liCollect[seq - nLiStepAll].style.background = 'red';
					button[0].disabled = false;
					textarea.readOnly = false;
					wrongFlag = true;
					boxDir = preDir;
					seq++;
			}			
		} else {
			if (++seq < textLength) {
				run(text[seq])
			} else {
				button[0].disabled = false;
				textarea.readOnly = false;
			}
		}
	}
	//运行时textarea的滚轴变化，以及ol的li颜色变化
	var programScroll = function() {
		var liCollect = ol.querySelectorAll('li');
		liCollect[seq - nLiStepAll].style.background = 'green';
		if (seq > 0) liCollect[seq - 1 - nLiStepAll].style.background = '#D2CBCB';
		if (seq > 9) {
			textarea.scrollTop = (seq - 9 - nLiStepAll) * 20;
		} else {
			textarea.scrollTop = 0;
		}
	}
	//读取输入内容,ie8
	addEvent('click', button[0], function() {
		var liCollect =  ol.querySelectorAll('li');
		for (var i = 0, m = liCollect.length; i < m; i++) {
			liCollect[i].style.background = '#D2CBCB';
		}
		wrongFlag = false;
		textarea.readOnly = true;
		seq = 0;
		nLiStepAll = 0;
		overFlag = false;
//		console.log((document.querySelector('textarea').value.match(/^[ \t]*$/gm) || []));
//		console.log((document.querySelector('textarea').value.match(/\n$|^/gm) || []));
//		console.log((document.querySelector('textarea').value.match(/\w*(?=\s)/gm) || []));		
		text = textarea.value.split(/\n|\r/g);
		textLength = text.length;
		for (var i = 0; i < textLength; i++) {
			text[i] = text[i].replace(/^\s*|\s*$/g, '');
			text[i] = text[i].toLowerCase();
		}
		button[0].disabled = true;
		run(text[seq]);
//		input.value = '';
	})
	addEvent('click', button[1], function() {	
		var li = document.createElement('li');
		li.innerHTML = 1;
		ol.innerHTML = '';
		ol.appendChild(li);
		wrongFlag = false;
		textarea.readOnly = false;
		textarea.value = '';
		text = []; 
		seq = 0;
		nLiStepAll = 0;
		overFlag = false;

		boxDir = [1, 0, 0, 0];
	    preDir = [1, 0, 0, 0];		
		blueLine.className = '';
		addClass(blueLine, 'top');
		box.style.position = 'absolute';
		box.style.left = ul2Width + tableWidth / 2 + 'px';
		box.style.top =  ul1Height + tableHeight / 2 + 'px';
		box.style.webkitTransform = 'rotate(0deg)';
		box.style.mozTransform = 'rotate(0deg)';
		box.style.msTransform = 'rotate(0deg)';
		box.style.transform = 'rotate(0deg)';		
	})
	addEvent('keydown', textarea, function(e) {
		var liCollect = ol.querySelectorAll('li');
		var liLength = liCollect.length;
		//延迟技巧，paste触发时候文本内容还是空的，所以延迟0ms-->4ms
		setTimeout(function() {
			text = textarea.value.split(/\n|\r/g);
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
			textLength += nLiStepAll;			
		}, 0)
		if (liLength > 9) {
			ol.style.height = 202 + 20 * (liLength - 9) + 'px';
		}
	})
	wheel(textarea,function(delta){
		if (delta > 0) {
			if (ol.offsetTop < -120) {
				ol.style.top = ol.offsetTop + delta + 'px';
			} else {
				ol.style.top = 0;
			}			
		} else {
			var olBottom = - parseInt(getCss(ol, 'height')) + 322;
			if (ol.offsetTop > olBottom) {
				ol.style.top = ol.offsetTop + delta + 'px';
			} else {
				ol.style.top = olBottom - 120 + 'px';
			}				
		}
	});
	addEvent('scroll', textarea, function(e) {
		ol.style.top = -textarea.scrollTop + 'px';
	});

})()