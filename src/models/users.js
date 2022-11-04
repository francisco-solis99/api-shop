const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  maternalSurname: DataTypes.STRING,
  paternalSurname: DataTypes.STRING,
  typeUser: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  hooks: {
    beforeCreate: function (user, options) {
      user.createdAt = new Date();
      user.updatedAt = new Date();
    },
    beforeUpdate: function (user, options) {
      user.updatedAt = new Date();
    },
  },
});
