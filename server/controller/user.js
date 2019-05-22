const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')
const bcrypt = require('bcryptjs')
const util = require('util')
const verify = util.promisify(jwt.verify)

class User {
  /**
   * 创建用户
   * @param ctx username 用户名字
   * @param ctx password 用户密码
   * @param ctx email 用户邮箱
   * @return 创建成功返回用户信息，失败返回错误信息
   */
  static async create(ctx) {
    let {
      username,
      password,
      email,
      phone,
      IP,
      roleId = '0'
    } = ctx.request.body;
    let params = {
      username,
      password,
      email,
      roleId,
      phone,
      IP
    }
    console.log(params)
    // 检测参数是否为空
    let errors = []
    for (let item in params) {
      if (params[item] === undefined) {
        let index = errors.length + 1;
        errors.push(`错误${index}:参数：${item}不能为空`)
      }
    }
    if (errors.length > 0) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: errors
      }
      return false
    }
    params.roleId = roleId
    // 检查用户是否已存在
    let exsitUser = await UserModel.username(params.username)
    if (exsitUser) {
      ctx.response.status = 403;
      ctx.body = {
        code: 403,
        msg: '用户已存在'
      }
    } else {
      try {
        // 加密密码
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(params.password, salt);
        params.password = hash;
        // 创建用户
        await UserModel.create(params);
        const newUser = await UserModel.username(params.username)
        // 签发token
        const userToken = {
          username: newUser.username,
          email: newUser.email,
          id: newUser.id,
          roleId: newUser.roleId,
          phone: newUser.phone,
          IP: newUser.IP
        }
        // token有效期
        const token = jwt.sign(userToken, secret.sign, {
          expiresIn: '1h'
        })
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '创建用户成功',
          data: token
        }
      } catch (error) {
        ctx.response.status = 500;
        ctx.body = {
          code: 500,
          msg: error
        }
      }
    }
  }
  /**
   * 查询用户信息
   * @param ctx token 分发用户的token
   * 
   * @return 查询成功返回用户信息，失败返回错误信息
   */
  static async info(ctx) {
    const {
      username
    } = ctx.request.body;
    try {
      let data = await UserModel.username(username)
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        data: error
      }
    }

  }

  /**
   * 删除用户
   * @param ctx id 用户ID
   * @return 删除成功返回true,失败返回错误原因
   */
  static async delete(ctx) {
    let {
      id
    } = ctx.params;
    if (!id) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '用户ID不能为空'
      }
      return false
    }
    if (isNaN(id)) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '请传入正确的ID'
      }
      return false
    }
    try {
      await UserModel.delete(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }

    } catch (error) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        msg: error
      }
    }
  }

  /**
   * 登录
   * @param ctx username 用户名
   * @param ctx password 用户密码
   * @return 登录成功返回用户信息，失败返回错误原因
   */
  static async login(ctx) {
    const {
      username,
      password
    } = ctx.request.body;
    // 查询用户
    const userDetail = await UserModel.username(username)
    if (!userDetail) {
      ctx.response.status = 403;
      ctx.body = {
        code: 403,
        msg: '用户名不存在'
      }
      return false
    }
    // 判断传入的密码是否与数据库密码一致
    if (bcrypt.compareSync(password, userDetail.password)) {
      // 用户token
      const userToken = {
        username: userDetail.username,
        email: userDetail.email,
        id: userDetail.id,
        roleId: userDetail.roleId,
        IP: userDetail.IP,
        phone: userDetail.phone
      }
      // 签发token
      const token = jwt.sign(userToken, secret.sign, {
        expiresIn: '1h'
      })
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          id: userDetail.id,
          email: userDetail.email,
          username: userDetail.username,
          roleId: userDetail.roleId,
          token: token
        }
      }
    } else {
      ctx.response.status = 401;
      ctx.body = {
        code: 401,
        msg: '用户名或密码错误'
      }
      return false
    }
  }
  /**
   * 获取用户列表
   * @param ctx 
   * @return 用户列表
   */
  static async list(ctx) {
    let {
      currentPage,
      pageSize,
      username,
      phone
    } = ctx.request.body;
    let params = {
      currentPage,
      pageSize,
      username,
      phone
    }
    try {
      let data = await UserModel.findAllUserList(params);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        msg: error
      }
      return false
    }
  }
  /**
   * 修改用户
   * @param ctx username 用户名
   * @param ctx password 用户密码
   * @param ctx newPassword 用户新密码
   */
  static async update(ctx) {
    let {
      username,
      password,
      email,
      roleId,
      phone,
      IP
    } = ctx.request.body;
    const params = {
      username,
      password,
      email,
      roleId,
      phone,
      IP
    }
    console.log(params)
    try {
      //加密
      if (password) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(params.password, salt);
        params.password = hash;
      }
      let data = await UserModel.update(params)
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '修改成功',
        data
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        msg: '修改失败',
        data: error
      }
      return false
    }
  }

}

module.exports = User