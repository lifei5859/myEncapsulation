//丐中丐版vue 1.0  嘻嘻
function MyVue (obj) {
    this.el = obj.el
    this.data = obj.data
    this.vNode = null
    initData.call(this, obj.data)
    let dom = document.getElementById(this.el)
    this.vNode = buildVirtualNode(dom)

    render.call(this, this.vNode)
}
//去除 模板内容花括号
function dropBorder (text) {
    var temp = text.substring(2, text.length);
    var result = temp.substring(0, temp.length - 2)
    return result
}
//获取模板属性的value
function getValue (data, text) {
    let str = text.split('.')
    let result = data;
    for (let i = 0; i < str.length; i++) {
        result = result[str[i]]
        console.log(result)
    }
    return result
}
//渲染dom树
function render (node) {
    if (!(node instanceof VNode)) {
        throw new Error('node is not VNode')
    }
    if (node.type === 1){
        for (let i = 0; i < node.childNodes.length; i ++) {
            render.call(this, node.childNodes[i])
        }
    } else {
        console.log(node)
        let tempResult = node.dom.nodeValue
        for (let i = 0; i < node.template.length; i++) {
            console.log(node.template)
            let reg = new RegExp('' + node.template[i] + '')
            let target = getValue(this, dropBorder(node.template[i]));
            tempResult = node.value.replace(reg, target);
        }
        node.dom.nodeValue = tempResult
    }
}

//初始化数据
function initData (data) {
    let tempObj = {}
    for (let key in data) {
        let temp;
        if (typeof data[key] === 'object') {
            if (data[key] instanceof Array) {
                temp = []
                initData.call(temp, data[key])
            } else {
                temp = {}
                initData.call(temp, data[key])
            }

        } else {
            temp = data[key]
        }
        Object.defineProperty(tempObj, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                console.log('get()')
                return temp
            },
            set: function (n) {
                console.log('set()')
                temp = n
            }
        });
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                console.log('get()')
                return temp
            },
            set: function (n) {
                console.log('set()')
                temp = n
            }
        });

    }
    this.$data = tempObj
}
//生成虚拟dom实例
function VNode (dom, type, value) {
    this.dom = dom
    this.type = type
    this.value = value
    this.childNodes = []
    this.template = []

    this.appendChild = function (node) {
        if (!(node instanceof VNode)) {
            throw new Error("node is not instanceof VNode")
        }
        this.childNodes.push(node)
    }
    this.appendContentTemplate = function (templates) {
        this.template = templates
    }
}
//匹配模板语法
function analysisContentTemplate (text) {
    if (text == null) {
        return []
    }
    let templateList = text.match(/{{[a-zA-Z_]+[a-zA-Z0-9._]*}}/g);
    return templateList == null ? [] : templateList
}
//创建虚拟dom树
function buildVirtualNode (node) {
    // console.dir(node)
    let temp = new VNode(node, node.nodeType, node.nodeValue);
    let contentTemplate = analysisContentTemplate(node.nodeValue);
    temp.appendContentTemplate(contentTemplate)
    console.log(temp)
    // console.log(node.nodeValue)
    for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === 1) {
            let child = buildVirtualNode(node.childNodes[i])
            temp.appendChild(child)
        } else if (node.childNodes[i].nodeType === 3) {
            let child = buildVirtualNode(node.childNodes[i])
            temp.appendChild(child);
        } else {
            continue
        }
    }
    return temp;
}



