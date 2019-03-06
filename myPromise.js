// 模拟es6 promise

function myPromise(fn) {
    if (typeof fn !== 'function') {
        throw Error(`Promise resolver ${fn} is not a function`)
    }

    var self = this
    this.status = 'pending'
    this.data = null
    this.resolvedArr = []
    this.rejectedArr = []

    function resolved(data) {
        setTimeout(function () {
            if (self.status == 'pending') {
                self.status = 'resolved'
                self.data = data
                self.resolvedArr.forEach(fn => fn())
            }
        }, 0)
    }
    function rejected(err) {
        setTimeout(function () {
            if (self.status == 'pending') {
                self.status = 'rejected'
                self.data = err
            }
        }, 0)
    }
    fn(resolved, rejected)
}

myPromise.prototype.then = function (onResolved, onRejected) {
    var self = this
    if (this.status == 'resolved') {
        return new myPromise(function (resolved, rejected) {
            var res = onResolved(self.data)
            if (res instanceof myPromise) {
                res.then(resolved, rejected)
            } else {
                resolved(res)
            }
        })
    }

    if (this.status == 'rejected') {
        return new myPromise(function (resolved, rejected) {
            var res = onRejected(self.data)
            if (res instanceof myPromise) {
                res.then(resolved, rejected)
            } else {
                resolved(res)
            }
        })
    }

    if (this.status == 'pending') {
        return new myPromise(function (resolved, rejected) {
            self.resolvedArr.push((function (onResolved) {
                return function () {
                    var res = onResolved(self.data)
                    if (res instanceof myPromise) {
                        res.then(resolved, rejected)
                    } else {
                        resolved(res)
                    }

                }
            })(onResolved))

            self.rejectedArr.push((function (onRejected) {
                return function () {
                    var res = onRejected(self.data)
                    if (res instanceof myPromise) {
                        res.then(resolved, rejected)
                    } else {
                        resolved(res)
                    }
                }
            })(onRejected))
        })
    }
}