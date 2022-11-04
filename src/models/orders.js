const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  quantity: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  hooks: {
    beforeCreate: function (order, options) {
      order.createdAt = new Date();
      order.updatedAt = new Date();
    },
    beforeUpdate: function (order, options) {
      order.updatedAt = new Date();
    },
  },
});
