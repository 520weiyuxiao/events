$(function () {
    var layer = layui.layer;
    var form = layui.form;
    getArticle();
    // 获取文章分类
    function getArticle() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success: function (res) {
                var htmlStr = template('tpl', res);
                $('tbody').html(htmlStr)
            }

        })
    }
    // 点击添加 绑定事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })
    })
    // 通过代理的形式，为form-add新增绑定事件
    $('body').on("submit", "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/cate/add',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('新增分类失败！')
                }
                getArticle();
                layer.msg('新增分类成功')
                layer.close(indexAdd)
            }
        })
    })
    // 通过代理形式为btn按钮绑定点击修改事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        // 获取编辑的id
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/cate/info?id=' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    // 点击确定修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'put',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('更新数据失败！')
                }
                layer.msg('更新数据分类成功！')
                layer.close(indexEdit)
                getArticle();
            }
        })
    })
    // 删除点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'delete',
                url: '/my/cate/del?id=' + id,
                success: function (res) {
                    if (res.code !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index)
                    getArticle();
                }
            })
        })
    })
})