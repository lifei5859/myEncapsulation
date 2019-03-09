jsonP = (function () {
    var oJson;
    return function (obj) {
        if (oJson) {
            document.body.removeChild(oJson);
        }
        oJson = document.createElement('script');
        oJson.src = obj.url + obj.val + obj.callback;
        document.body.appendChild(oJson);
    }
}())