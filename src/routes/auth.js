const router = require('express').Router();
const sequelize = require('../../config/db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { body } = req;
  const user = await sequelize.models.users.findOne({
    where: {email: body.email}
  });
  if(!user) return res.status(404).json({message: 'Unauthorized'});
  if(!user.validPassword(body.password)) return res.status(404).json({message: 'Invalid credentials'});

  // Use jsonwebtoken
  const token = jwt.sign({ userId: user.id}, 'secretKey', {
    expiresIn: 3600
  });

  return res.json({
    message: 'Authenticated succesfully!',
    token
  })

});


router.post('/signup', async (req, res) => {
  const { body } = req;
  const user = await sequelize.models.users.findOne({
    where: {email: body.email}
  });
  if (user) return res.status(400).json({ code: 404, message: 'User already exists' });

  await sequelize.models.users.create({...body, "type": "client"})
  .then(newUser => {
    res.status(201).json({ message: 'User created succesfully', data: newUser })
  })
  .catch(err => {
    res.json({"Error": err.message});
  });

});


module.exports = router;
