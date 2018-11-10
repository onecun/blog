const blogTemplate = function (blog) {
    /*
         <div class="item" >
             <a href="./article.html" class="title"></a> 
             <div class="status"></div> 
             <div class="content"></div> 
         </div>
         */
    var title = blog.title
    var content = blog.content
    var author = blog.author
    var id = blog.id
    // var date = blog.date
    var d = new Date(blog.date * 1000)
    var time = d.toLocaleString()

    var t = `<div class="article" >
                <div id="${id}" class="article-title">${title}</div> 
                <div class="author">${author} | ${time}</div>
                <div class="content">${content}</div> 
             </div> `
    // console.log(t)
    return t
}

const blogInsert = function (blogs) {
    // console.log('blogInsert 执行')

    var html = ''
    for (let i = 0; i < blogs.length; i++) {
        var blog = blogs[i];
        // console.log(blogs[i])
        html += blogTemplate(blog)
    }
    // console.log(typeof html, html, '92行')
    var al = e('.article-list')
    // console.log(al)
    al.innerHTML = html
    // console.log(al.innerHTML)
}


const showDetailBlog = function () {
    // 得到 被点击标题父元素的 html string
    var p = event.target.parentNode.outerHTML
    // console.log(p)
    var al = e('.article-list')
    al.innerHTML = p
}

// 通过事件委托绑定 文章标题
const bindAL = function () {
    // var selector = '.article-list'
    var AL = e('.article-list')
    al = bindEvent(AL, 'click', function (event) {
        console.log(event.target)
        if (event.target.classList.contains('article-title')) {
            showDetailBlog()
            // 切换 地址栏
            var newUrl = `#/id=${event.target.id}`
            e('title').innerText = event.target.innerText
            history.pushState(null, '', newUrl)
        }
    })
}

