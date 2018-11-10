const fs = require('fs')

const blogPath = 'db/blog.json'
const indexPath = 'template/index.html'
const writePath = 'template/write.html'

const ModelBlog = function(form) {
    this.title = form.title || ''
    this.content = form.content || ''
    this.author = form.author || ''
    this.date = Math.floor(new Date() / 1000)
}

const loadBlog = function () {
    var content = fs.readFileSync(blogPath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

/*
b 这个对象是我们要导出给别的代码用的对象
它有一个 data 属性用来存储所有的 blogs 对象
它有 all 方法返回一个包含所有 blog 的数组
它有 new 方法来在数据中插入一个新的 blog 并且返回
他有 save 方法来保存更改到文件中
*/
const b = {
    data: loadBlog()
}

b.index = function() {
    var indexHtml = fs.readFileSync(indexPath, 'utf-8')
    return indexHtml
}

b.getWriteHtml = function() {
    var writeHtml = fs.readFileSync(writePath, 'utf-8')
    return writeHtml
}

b.all = function() {
    const blogs = this.data
    return blogs
}

b.add = function(form) {
    var m = new ModelBlog(form)
    var d = this.data[this.data.length - 1]
    if(d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
        // console.log('d.id == ', d.id)
    }
    // 把新数据加入
    this.data.push(m)
    // 保存
    this.save()
}

b.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(blogPath, s, (error) => {
        if(error) {
            console.log('保存失败')
        } else {
            console.log('保存成功')
        }
    })
}


// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b