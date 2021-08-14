$(function(){
    // 点击去注册账号连接
    $('#link-reg').on('click', function(){
        $('.login-box').hide()
        $('.red-box').show()
    })
    // 点击登录
    $('#link-login').on('click', function(){
        $('.login-box').show()
        $('.red-box').hide()
    })
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.ver ify()函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验俩次密码是否一致的规则
        repwd: function(value){
            //通过形参拿到的是确认密码框的内容 
            // 还需要拿到密码框的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息
            var pwd = $('.red-box [name=password]').val()
            if(pwd !== value){
                return "俩次密码不一致"
            }
        }
    })
    // 监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
      repassword: $('#form_reg [name=repassword]').val()
    }
    $.post('/api/reg', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link-login').click()
    })
  })
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.code !== 0) {
            return layer.msg('登录失败！')
          }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '../../index.html'
      }
    })
  })

})