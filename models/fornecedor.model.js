const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fornecedor = sequelize.define('Fornecedor', {
    nome: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Fornecedor;