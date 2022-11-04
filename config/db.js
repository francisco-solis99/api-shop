const { Sequelize } = require('sequelize');

// Exporting models
const productModel = require('../src/models/products');
const reviewModel = require('../src/models/reviews');
const userModel = require('../src/models/users');
const orderModel = require('../src/models/orders');

const sequelize = new Sequelize('shop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
  port: 3306,
});


// Adding models
const models = [productModel, reviewModel, userModel, orderModel];

// Registering models to Sequelize
models.forEach(model => model(sequelize));


// Configuring Relaions

// Products with reviews
const { products, reviews } = sequelize.models;
reviews.belongsTo(products); // one to one relation

// User with orders


module.exports = sequelize;
