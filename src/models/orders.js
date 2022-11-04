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
  createAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  hooks: {
    beforeCreate: function (review, options) {
      review.createdAt = new Date();
      review.updatedAt = new Date();
    },
    beforeUpdate: function (review, options) {
      review.updatedAt = new Date();
    },
  },
});
