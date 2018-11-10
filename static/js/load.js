// 加载全部 博客
const loadBlog = function () {
    var request = {
        method: 'GET',
        url: 'api/blog/all',
        data: '',
        contentType: 'application/json',
        callback: function (response) {
            blogs = JSON.parse(response)
            // console.log('askjdbasjkdb', blogs, blogs.length)
            // console.log(typeof blogs)
            blogInsert(blogs)
        },
    }
    // console.log('getBlog 执行')
    ajax(request)
}

// 切换 地址 时，刷新页面
const reload = function () {
    window.addEventListener('popstate', function (event) {
        load()
    })
}

// 加载指定博客详情
const loadDetailBlog = function () {
    id = url.split('=')[1]
    var request = {
        method: 'POST',
        url: 'api/blog/article',
        data: {
            "id": id
        },
        contentType: 'application/json',
        callback: function (response) {
            blogs = JSON.parse(response)
            // console.log('askjdbasjkdb', blogs, blogs.length)
            // console.log(typeof blogs)
            blogInsert(blogs)
        },
    }
    console.log(request)
    ajax(request)
}

// 根据 地址 加载不同内容
const load = function () {
    url = document.location.href
    console.log(url)
    if (url == 'http://localhost:8000/') {
        // window.location.reload(true)
        loadBlog()
    } else {
        loadDetailBlog()
    }
}
