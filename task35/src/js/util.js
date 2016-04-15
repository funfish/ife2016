'use strict'
/**
* 添加样式
* @param {dom} el 节点
* @param {css} newClassName 新添加的样式
*/
function addClass(el, newClassName) {
	el.className += '' + newClassName;
}
exports.addClass = addClass;


/**
* 移除element中的样式oldClassName
* @param {dom} el 节点
* @param {css} oldClassName 删除的样式
*/
function removeClass(el, oldClassName) {
    el.className = el.className.replace(/oldClassName/,'')
}
exports.removeClass = removeClass;

/**
* 获取DOM节点上的样式上的值
* @param {dom} el 节点 
* @param {string} key 属性
*/
function getCss(el, key){
    return el.currentStyle ? el.currentStyle[key] : document.defaultView.getComputedStyle(el ,false)[key];
}
exports.getCss = getCss;

/**
* 强行ie8事件绑定
* param {string} evnt 事件名
* param {dom} el 节点
* param {function} func 事件响应后处理的函数
*/
function addEvent(evnt, el, func) {
   if (el.addEventListener)  // W3C DOM
      el.addEventListener(evnt, func, false);
   else if (el.attachEvent) { // IE DOM
      el.attachEvent("on" + evnt, func);
   }
   else { // No much to do
      el[evnt] = func;
   }
}
exports.addEvent = addEvent;

/**
* 恶心的滚轮事件
* param {dom} el 节点
* param {function} callback 回调函数
*/
function wheel (el, callback) {
	var wheelType = 'mousewheel';
	var foxFlag = false;
   	try {
		document.createEvent("MouseScrollEvents");
		foxFlag = true;
		wheelType = "DOMMouseScroll";
	} catch(e) {}
	addEvent(wheelType, el, function(e) {
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
exports.wheel = wheel;