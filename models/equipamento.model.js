const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipamento = sequelize.define('Equipamento', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Equipamento;
