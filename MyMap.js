// 模拟Es6 map
function MyMap(arr) {
    this.init();

    if (arr) {
        arr.forEach((ele) => {
            this.set(ele[0], ele[1]);
        })
    }
}
MyMap.prototype.init = function () {
    this.len = 8;
    this.bucket = [];
    this.maxArr = [];
    for (let i = 0; i < this.len; i++) {
        this.bucket[i] = {};
        this.bucket[i].next = null;
        this.bucket[i].__num__ = 0;
    }
}
MyMap.prototype.hash = function (key) {
    let hash = 0;
    if (typeof key == 'string') {
        let len = key.length > 3 ? key.length : 3;
        for (let i = len - 3; i < len; i++) {
            hash += key[i] == undefined ? 0 : key.charCodeAt(i);
        }
    } else if (typeof key == 'object' && key != null || typeof key == 'undefined') {
        hash = 0;
    } else if ( Object.is(key, NaN) ) {
        hash = 1
    } else {
        hash = +key
    }
    return hash;
}
MyMap.prototype.set = function (key, value) {

    let hash = this.hash(key) % this.len;
    let nextNode = this.bucket[hash];

    while (nextNode.next) {
        if (nextNode.next.key === key) {
            nextNode.next.value = value;
        } else {
            nextNode = nextNode.next;
        }
    }
    this.bucket[hash].__num__++;
    this.maxArr.push([key, value]);
    console.log(hash, this.bucket[hash].__num__);
    if (this.bucket[hash].__num__ >= this.len) {
        this.len += this.len / 2;
        for (let i = 0; i < this.len; i++) {
            this.bucket[i] = {};
            this.bucket[i].next = null;
            this.bucket[i].__num__ = 0;
        }
        this.maxArr.forEach((ele) => {
            this.set(ele[0], ele[1]);
        })
    }
    nextNode.next = { key, value, next: null }
    return this
}
MyMap.prototype.get = function (key) {
    let hash = this.hash(key) % this.len;
    let nextNode = this.bucket[hash];
    while (nextNode.next) {
        if (nextNode.next.key === key) {
            return nextNode.next.value
        } else {
            nextNode = nextNode.next;
        }
    }
    console.log(333);
    return
}
MyMap.prototype.has = function (key) {
    let hash = this.hash(key) % this.len;
    let nextNode = this.bucket[hash];
    while (nextNode.next) {
        console.log(111);
        if (nextNode.next.key === key) {
            return true
        } else {
            console.log(2222);
            nextNode = nextNode.next;
        }
    }
    console.log(333);
    return false;
}
MyMap.prototype.delete = function (key) {
    let hash = this.hash(key) % this.len;
    let nextNode = this.bucket[hash];
    while (nextNode.next) {
        if (nextNode.next.key === key) {
            nextNode.next = nextNode.next.next;
        } else {
            nextNode = nextNode.next;
        }
    }
    return
}
MyMap.prototype.cel = function () {
    this.init();
}