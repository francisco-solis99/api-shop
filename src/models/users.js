const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
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
      beforeCreate: (user) => {
        // Encrypt the password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  // Method to User prototype to validPassword (Login)
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  return User;
};
