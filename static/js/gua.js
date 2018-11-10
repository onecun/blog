const e = function (selector) {
    return document.querySelector(selector)
}

const es = function (selector) {
    return document.querySelectorAll(selector)
}

const bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const ajax = function (request) {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function
    */
    console.log('Ajax 执行')
    /*
    var readFile = function (fileName) {
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, function (error, data) {
                if (error) reject(error);
                resolve(data);
            });
        });
    };
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function (event) {
        if (r.readyState === 4) {
            // console.log(r.response)
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        console.log('get dododo')
        r.send()
    } else {
        console.log('post dpdodo', request.data)
        var str = JSON.stringify(request.data)
        console.log(str)
        r.send(str)
    }

}