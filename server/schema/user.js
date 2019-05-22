const moment = require('moment')
/**
 * 定义user表数据类型
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'roleId'
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'email'
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      field: 'phone'
    },
    IP: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'IP'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt',
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt',
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }, {
    freezeTableName: true
  })
}