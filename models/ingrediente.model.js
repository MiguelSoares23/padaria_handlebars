const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ingrediente = sequelize.define('Ingrediente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Ingrediente;
