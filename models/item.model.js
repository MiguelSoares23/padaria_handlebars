const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('item', {
    nome: {
        type: DataTypes.STRING, 
        allowNull: false,
    },

    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = Item;