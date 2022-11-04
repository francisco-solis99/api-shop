const { Sequelize } = require('sequelize');

// Exporting models
const productModel = require('../src/models/products');
const reviewModel = require('../src/models/reviews');

const sequelize = new Sequelize('shop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
  port: 3306,
});


// Adding models
const models = [productModel, reviewModel];

// Registering models to Sequelize
models.forEach(model => model(sequelize));


// Configuring Relaions
const { products, reviews } = sequelize.models;
reviews.belongsTo(products); // one to one relation

module.exports = sequelize;
