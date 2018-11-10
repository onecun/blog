const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// 导入 ./model/blog.js 
const blog = require('./model/blog.js')

// 设置静态文件地址
app.use(express.static('static'))

const log = function () {
    console.log.apply(console, arguments)
}

app.get('/', function (req, res) {
    var indexHtml = blog.index()
    res.send(indexHtml)
})

app.get('/api/blog/all', function (req, res) {
    var data = blog.all()
    res.send(data)
})

app.post('/api/blog/article', function (req, res) {
    var id = req.body
    log('asdasd',id, typeof id)
    var data = blog.all()
    for (let i = 0; i < data.length; i++) {
        // log(id.id, d[i].id)
        if (parseInt(id.id, 10) === data[i].id) {
            log(id, data[i])
            res.send([data[i]])
        }
    }
})

app.get('/write', function(req, res) {
    var writeHtml = blog.getWriteHtml()
    res.send(writeHtml)
})

app.post('/api/blog/add', function(req, res) {
    // log('得到 form', req.body, typeof req.body)
    // var form = JSON.parse(req.body)
    var form = req.body
    blog.add(form)
    res.send('发表成功')
})

app.listen(8000, function () {
    log('正在监听 8000 端口')
})

/*
1,  用户访问主页
2， 服务器返回一张带 模板主页 的页面 
3， 浏览器通过 ajax 请求所有的 blog 文件
4， 把得到的 blog append 到页面中
*/