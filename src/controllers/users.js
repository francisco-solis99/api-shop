const sequelize = require('../../config/db');


const getUsers = async (req, res) => {
  const users = await sequelize.models.users.findAndCountAll();
  return res.status(200).json({ data: users });
}


const createUser = async (req, res) => {
  const { body } = req;
  const user = await sequelize.models.users.create({
    name: body.name,
    maternalSurname: body.maternalSurname,
    paternalSurname: body.paternalSurname,
    typeUser: body.typeUser,
    email: body.email,
    password: body.password,
  });
  await user.save();
  return res.status(201).json({ data: user })
}

const updateUser = async (req, res) => {
  const { body, params: { id } } = req;
  const user = await sequelize.models.users.findByPk(id);
  if (!user) {
    return res.status(404).json({ code: 404, message: 'User not found' });
  }
  const updatedUser = await user.update({
    name: body.name,
    maternalSurname: body.maternalSurname,
    paternalSurname: body.paternalSurname,
    typeUser: body.typeUser,
    email: body.email,
    password: body.password,
  });
  return res.json({ data: updatedUser });
}

const delateUser = async (req, res) => {
  const { params: { id } } = req;
  const user = await sequelize.models.users.findByPk(id);
  if (!user) {
    return res.status(404).json({ code: 404, message: 'User not found' });
  }
  await user.destroy();
  return res.json();
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  delateUser
};
