const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('funcionario', {
    nome: {
        type: DataTypes.STRING, 
        allowNull: false,
    },

    funcao: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Funcionario;