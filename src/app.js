
const express = require('express');

const app = express();

// Config
app.set('nameApp', 'api-shop');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //using the middleware to convert the respons in a valid JS object

app.get('/', (request, response) => {
  response.send('<h1>Shop API</h1>')
});

app.use('/api', require('./routes'))


// Sequelize connection
// try {
//   sequelize.authenticate();
//   sequelize.sync();
//   console.log('Connected to DB');
// } catch (error) {
//   console.log('Unable to connect to DB: ', error);
// }

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening the ${app.get('nameApp')} on port ${PORT}`);
});
