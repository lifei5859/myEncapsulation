

function jQuery (dom) {
    return new jQuery.prototype.init(dom);
}

(function (global) {
    function myIn (str, item) {
        return str.indexOf(item) !== -1 ? true : false;
    }
    jQuery.prototype.init = function (dom) {
        this.length = 0;
        var domObj;
        var domStr;
        var num;

        if (dom == null) { // 传参为空时
            return this;
        }
        if (typeof dom === 'string') {//参数为字符串
            if (myIn(dom, ':')) { // 参数中有修饰
                console.log(dom);
                let condition = dom.split(':')[1];
                domStr = dom.split(':')[0];
                console.log(condition, domStr);
            if (myIn(condition, 'eq')) { //参数修饰为eq
                let reg = /[0-9]+/g;
                num = Number(condition.match(reg)[0]);

            }
            } else {
                domStr = dom;
            }
             if (myIn(domStr, '.')) {// 为css选择器时
                domObj = document.getElementsByClassName(domStr.slice(1));
            } else if(myIn(domStr, '#')) {// 为id选择器时
                domObj = document.getElementById(domStr.slice(1));
            } else { // 为标签选择器时
                domObj = document.getElementsByTagName(domStr);
            }
        }

        if (typeof num === 'number') { // eq中有参数并为数字
            this[0] = domObj[num];
            this.length++;
        } else { //没有修饰符时
            if (dom instanceof Element || !domObj.length) {// 参数为dom对象 或 id选择器
                this[0] = domObj || dom;
                this.length++;
            } else {// 处理css选择器 或 标签选择器时
                for (let i = 0; i < domObj.length; i++) {
                    this[i] = domObj[i];
                    this.length++;
                }
            }
        }
    }
    //css方法
    jQuery.prototype.css = function (cssObj) { 
        for (let i = 0; i < this.length; i++) {
            for (let attr in cssObj){
               this[i].style[attr] = cssObj[attr];
            }
        }
        return this;
    }
    //get方法
    jQuery.prototype.get = function (num) {
        return num != null ? (num < 0 ? this[this.length + num] : this[num]) : null;
    }
    //eq方法
    jQuery.prototype.eq = function (num) {
        var temp = num != null ? (num < 0 ? this[this.length + num] : this[num]) : null;
        return jQuery(temp);
    }
   jQuery.prototype.init.prototype = jQuery.prototype;
    global.jQuery = global.$ = jQuery;
}(window));
