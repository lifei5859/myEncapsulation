//丐中丐 jQuery

function jQuery (dom) {
    return new jQuery.prototype.init(dom)
}

(function (global) {
    function myIn (str, item) {
        return str.indexOf(item) !== -1 ? true : false
    }
    jQuery.prototype.init = function (dom) {
        // let doms = {}
        this.length = 0
        var domObj
        var domStr
        var num

        if (dom == null) {
            return this
        }
        if (typeof dom === 'string') {
            if (myIn(dom, ':')) {
                console.log(dom)
                let condition = dom.split(':')[1]
                domStr = dom.split(':')[0]
                console.log(condition, domStr)
            if (myIn(condition, 'eq')) {
                let reg = /[0-9]+/g
                num = Number(condition.match(reg)[0])

            }
            } else {
                domStr = dom
            }
             if (myIn(domStr, '.')) {
                domObj = document.getElementsByClassName(domStr.slice(1))
            } else if(myIn(domStr, '#')) {
                domObj = document.getElementById(domStr.slice(1))
            } else {
                domObj = document.getElementsByTagName(domStr)
            }
        }

        // if (dom instanceof Element) {
        //     this[0] = dom
        //     this.length++
        // }

        if (typeof num === 'number') {
            this[0] = domObj[num]
            this.length++
        } else {
            if (dom instanceof Element || !domObj.length) {
                this[0] = domObj || dom
                this.length++
            } else {
                for (let i = 0; i < domObj.length; i++) {
                    this[i] = domObj[i]
                    this.length++
                }
            }
        }
    }
    jQuery.prototype.css = function (cssObj) {
        for (let i = 0; i < this.length; i++) {
            for (let attr in cssObj){
               this[i].style[attr] = cssObj[attr]
            }
        }
        return this
    }
    jQuery.prototype.get = function (num) {
        return num != null ? (num < 0 ? this[this.length + num] : this[num]) : null
    }
    jQuery.prototype.eq = function (num) {
        var temp = num != null ? (num < 0 ? this[this.length + num] : this[num]) : null
        return jQuery(temp)
    }
   jQuery.prototype.init.prototype = jQuery.prototype
    global.jQuery = global.$ = jQuery
}(window))

var a = $('.item').eq(-1)