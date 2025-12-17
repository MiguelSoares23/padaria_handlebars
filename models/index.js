const { Sequelize } = require('sequelize');
const bd = require('../config/database');

const Item = require('./item.model');
const Funcionario = require('./funcionario.model');
const Cliente = require('./cliente.model');
const Fornecedor = require('./fornecedor.model');
const Ingrediente = require('./ingrediente.model');
const Equipamento = require('./equipamento.model');
const Pedido = require('./pedido.model');

Cliente.hasMany(Pedido, {
    foreignKey: 'clienteId',
    as: 'pedidos'
});

Pedido.belongsTo(Cliente, {
    foreignKey: 'clienteId',
    as: 'cliente'
});

Pedido.belongsToMany(Item, {
    through: 'itemPedido',
    foreignKey: 'pedidoId',
    as: 'itens'
});

Item.belongsToMany(Pedido, {
    through: 'itemPedido',
    foreignKey: 'itemId',
    as: 'pedidos'
});

module.exports = {
    Item,
    Pedido,
    Cliente
}