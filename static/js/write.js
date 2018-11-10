const sendForm = function () {
    var form = {
        title: e('#id-add-title').value,
        author: e('#id-add-author').value,
        content: e('#id-add-content').value,
    }
    if (form.content != '') {
        var request = {
            method: 'POST',
            url: 'api/blog/add',
            data: form,
            contentType: 'application/json',
            callback: function (response) {
                alert(response)
            },
        }
        ajax(request)
    } else {
        alert('请输入内容')
    }
}

const bindButton = function () {
    var btn = e('#id-add-submit')
    bindEvent(btn, 'click', function (event) {
        console.log('click submit')
        sendForm()
    })
}

const _main = function() {
    bindButton()
}

_main()