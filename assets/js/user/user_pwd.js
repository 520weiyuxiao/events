$(function () {
    var form = layui.form
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=old_pwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=new_pwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    $(".layui-form").on("submit", function (e) {
        e.preventDefault(),
            $.ajax({
                method: "patch",
                url: "/my/updatepwd",
                data: $(this).serialize(),
                success: function (res) {
                    console.log(res);
                    if (res.code !== 0) {
                        return layui.layer.msg("密码重置失败，请重新输入")
                    }
                    layer.msg("密码重置成功")
                    // 重置表单
                    $(".layui-form")[0].reset()
                }
            })
    })
})