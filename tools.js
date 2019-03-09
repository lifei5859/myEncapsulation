
// 数组去重方法
Array.prototype.unique = function () {
	var len = this.length,
		obj = {},
		lin = [];
	for (var i = 0; i < len; i++) {
		if (obj[this[i]] == undefined) {
			obj[this[i]] = 'wocao';
			lin.push(this[i]);

		}

	}
	return lin;
}
// 克隆对象方法
function copy(a, b) {
	var b = b || {},
		tosrt = Object.prototype.toString,
		s = "[object Array]";
	for (var prop in a) {
		if (a.hasOwnProperty(prop)) {
			if (typeof (a[prop]) == 'object') {
				if (tosrt.call(a[prop]) == '[object Array]') {
					b[prop] = [];
				} else {
					b[prop] = {};
				}
				copy(a[prop], b[prop]);
			} else {
				b[prop] = a[prop];
			}
		}
	}
}
// 对象继承
	var inherit = (function() {
		var F = function () {};
		return function(Target,Origin) {
		F.prototype = Origin.prototype;
		Target.prototype = new F();
		Target.prototype.constuctor = Target;
		Target.prototype.uber = Origin.prototype;
		}
	}());
//对象深度克隆
	function deepClone(Target,Origin) {
		var Origin = Origin || {};
		for (var prop in Target) {
			if (Target.hasOwnProperty(prop)) {
				if (Target[prop] !== 'null' && typeof(Target[prop]) === 'object') {
					if (Object.prototype.toString.call(Target[prop]) === '[object Array]') {
						Origin[prop] = [];
					}else {
						Origin[prop] = {};
					}
			//Origin[prop] = Object.prototype.toString.call(Target[prop]) === '[object Array]' ? [] :{}
					deepClone(Target[prop],Origin[prop]);
				}else {
					Origin[prop] = Target[prop];
				}
			}
		}
		return Origin;
	}//Origin深度克隆Target//

// 获取元素css属性值计算数据
function getStyle(el, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(el, null)[prop];
	} else {
		return el.currentStyle[prop];
	}
}
// 获取e的第n个兄弟元素节点，n为负数时获取e前的元素节点，n为负数时获取后面的
function retSibling(e, n) {
	while (e && n) {
		if (n > 0) {
			if (e.nextElementSibling) {
				e = e.nextElementSibling;
			} else {
				for (e = e.nextSibling; e && e.nodType != 1; e = e.nextSibling);
			}
			n--;
		}
		if (n < 0) {
			if (e.previousElementSibling) {
				e = e.previousElementSibling;
			} else {
				for (e = e.previousSibling; e && e.nodType != 1; e = e.previousSibling);
			}
			n++;
		}
	}
	return e;
}
// 元素绑定事件，兼容写法。
function addEvent(elem, type, handle) {
	if (elem.addEventListener) {
		elem.addEventListener(type, handle, false);
	} else if (elem.attachEvent) {
		elem.attachEvent('on' + type, function () {
			handle.call(elem);
		})
	} else {
		elem['on' + type] = handle;
	}
}
// 消除事件默认功能兼容写法，
function cancelHandler(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}
// 消除冒泡事件，兼容写法
function stopBubble(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBnbble = true;
	}
}
// 鼠标拖拽事件绑定
function drag(elem) {
	var disX,
		disY;
	addEvent(elem, 'mousedown', function (e) {
		var event = e || window.event;
		disX = event.clientX - parseInt(getStyle(elem, 'left'));
		disY = event.clientY - parseInt(getStyle(elem, 'top'));
		addEvent(document, 'mousemove', mouseMove);
		addEvent(document, 'mouseup', mouseUp);
		stopBubble(event);
		cancelHandler(event);
	});
	function mouseMove(e) {
		var event = e || window.event;
		elem.style.left = event.clientX - disX + 'px';
		elem.style.top = event.clientY - disY + 'px';
	}
	function mouseUp(e) {
		var event = e || window.event;
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}

}
// 多物体多值链式运动
function movement(obj, arr, callback) {
	clearInterval(obj.timer);
	var speed, newSite;
	obj.timer = setInterval(function () {
		var sopt = true;
		for (var prop in arr) {
			if (prop == 'opacity') {
				newSite = parseFloat(getStyle(obj, prop)) * 100;
			} else {
				newSite = parseInt(getStyle(obj, prop));
			}
			speed = (arr[prop] - newSite) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			console.log(speed);
			if (prop == 'opacity') {
				console.log(newSite + ' ' + speed)
				obj.style[prop] = (newSite + speed) / 100;
				console.log(prop + ' ' + obj.style[prop]);
			} else {
				obj.style[prop] = newSite + speed + 'px';
			}
			if (newSite != arr[prop]) {
				sopt = false;
			}
		}
		if (sopt) {
			console.log(prop + ' ' + obj.style[prop]);
			clearInterval(obj.timer);
			console.log(callback);
			typeof callback == 'function' ? callback() : '';
		}
	}, 30)
}
// dom  class选择器兼容写法
Document.prototype.getByClassName = function(dom){
	var classInit = document.getElementsByTagName('*');
		classInit = Array.prototype.slice.call(classInit,0);
		var arr = [];
		   console.log(classInit);
		 function trimClassName(str){
			 var trimStr = str.className.replace(/\s+/g,' ').trim();
			 return  trimStr;
		 }
		   classInit.forEach(function(ele,index){
			   var nameArr = trimClassName(ele).split(' ');
			   for(var i = 0; i<nameArr.length; i++){
					   if(nameArr[i] == dom){
						   arr.push(ele);
					   }
			   }
			 })
			 return arr;
   }
//    获取 滚动条滚动距离
   function getViewportOffset(){
	if(window.innerWidth){
		return{
			w : window.innerWidth,  
			h : window.innerHeight
		}
	}else{
		if(document.compatMode === "BackCompat"){
			return {
				w : document.body.clientWidth,
				h : document.body.clientHeight
			}
		}else{
		  return  {w : document.documentElement.clientWidth,
			h : document.documentElement.clientHeight
			}
		}
	}

}

// type类型判断
function type(Target) {
	var template = {
		'[object Array]' : 'array',
		'[object Object]' : 'object',
		'[object String]' : 'string - object',
		'[object Nember]' : 'number - object',
		'[object Boolean]' : 'boolean - object'
	}
	if (Target == null) {
		return 'null';
	}else if (typeof(Target) == 'object') {
		return template[Object.prototype.toString.call(Target)];
	}else {
		return typeof(Target);
	}
}


//查看滚动条滚动距离
function getScrollOffset() {
	if (window.pageXOffset) {
		return {
			x : window.pageXOffset,
			y : window.pageYOffset
		}
	}else {
		return {
			x : document.documentElement.scrollLeft + document.body.scrollLeft,
			y : document.documentElement.scrollTop + document.body.scrollTop
		}
	}
}

// 查看屏幕尺寸
function getViewportOffset() {
	if (window.innerWidth) {
		return {
			width : window.innerWidth,
			height : window.innerHight
		}
	}
	if (window.compatMode == 'CSS1Compat') {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHight
		}
	}else if (window.compatMode == 'BackCompat') {
		return {
			width : document.body.clientWidth,
			height : document.body.clientHight
		}
	}
}
