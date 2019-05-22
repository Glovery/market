const Router = require('koa-router')
const User = require('../controller/user')
const router = new Router({
  prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/user/resigter', User.create)
// 用户登录
router.post('/user/login', User.login)
// 删除用户
router.post('/user/delete/:id', User.delete)
//修改用户信息
router.post('/user/update', User.update)
// 获取用户信息
router.post('/user/info', User.info)
// 获取用户列表
router.post('/user/list', User.list)

module.exports = router