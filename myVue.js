let oP = document.getElementsByTagName('p')[0]
let oInput = document.getElementsByTagName('input')[0]

let obj = {
    name: 'cst'
}

function observer (data) {
    if (!data || typeof data !== 'object') {
        return data
    }

    Object.keys(data).forEach((key) => {
        definedRective(data, key, data[key])
    })
}

function definedRective (data, key, value) {
    observer(value)
 Object.defineProperty(data, key, {

    get () {
        return value
    },

    set (newValue) {
        value = newValue
        unDate()
    }
})
}
observer(obj)
function unDate () {
  console.log('更新了')
  oP.innerText = obj.name
}

oInput.oninput = function () {
    obj.name = this.value
}



