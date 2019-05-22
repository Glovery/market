const Sequelize = require('sequelize')

/**
 * 配置数据库
 * 第一个参数 market 数据库名字
 * 第二个参数 root   数据库用户名
 * 第三个参数 admin  数据库密码
 */

const sequelize = new Sequelize('market', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  dialectOptions: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
})

module.exports = {
  sequelize
}