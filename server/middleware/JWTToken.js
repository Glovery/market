const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')
const util = require('util')
const verify = util.promisify(jwt.verify)
const JWTPath = require('./JWTPath')

/**
 * 判断token是否有用
 */
module.exports = function () {
  return async function (ctx, next) {
    // 检测过滤的路由就不解析jwt
    if (JWTPath.find(item => item === ctx.request.url)) {
      await next()
      return false;
    }
    try {
      // 获取jwt
      const token = ctx.header.authorization
      if (token) {
        let payload
        try {
          // 解析payload,获取用户名和ID
          payload = await verify(token.spilt(' ')[1], secret.sign)
          ctx.user = {
            name: payload.name,
            email: payload.email,
            id: payload.id,
            phone: payload.phone
          }
        } catch (err) {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: 'Token身份无效'
          }
        }
      }
      await next()
    } catch (error) {
      if (error.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          error
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          error
        }
      }
    }
  }
}