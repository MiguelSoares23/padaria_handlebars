const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  cliente: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Pedido;