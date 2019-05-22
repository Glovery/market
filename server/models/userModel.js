const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user')

User.sync({
  force: false
})

class UserModel {
  /**
   * 创建用户
   */
  static async create(user) {
    let {
      username,
      password,
      email,
      roleId,
      phone,
      IP
    } = user;
    await User.create({
      username,
      password,
      email,
      roleId,
      phone,
      IP
    })
    return true
  }
  /**
   * 删除用户
   */
  static async delete(id) {
    await User.destroy({
      where: {
        id
      }
    })
    return true
  }
  /**
   * 查询用户列表
   */
  static async findAllUserList(user) {
    let {
      currentPage,
      pageSize,
      username,
      phone
    } = user
    let obj = {}
    if (username) {
      obj['username'] = username
    } else if (phone) {
      obj['phone'] = phone
    }
    return await User.findAndCountAll({
      where: obj,
      offset: pageSize * (currentPage - 1),
      limit: pageSize
    })
  }
  /**
   * 查询用户信息
   */
  static async username(username) {
    return await User.findOne({
      where: {
        username
      }
    })
  }
  /**
   * 修改用户信息
   */
  static async update(user) {
    let {
      username,
      password,
      email,
      phone,
      IP,
      roleId
    } = user
    return await User.update({
      username,
      password,
      email,
      phone,
      IP,
      roleId,
    }, {
      where: {
        username
      }
    })
  }
}

module.exports = UserModel