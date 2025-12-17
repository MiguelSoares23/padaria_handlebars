const express = require('express');
const exphbs = require('express-handlebars');

const db = require('./config/database');
const Item =  require('./models/item.model');
const Funcionario = require('./models/funcionario.model');
const Cliente = require('./models/cliente.model');
const Fornecedor = require('./models/fornecedor.model');
const Ingrediente = require('./models/ingrediente.model');
const Equipamento = require('./models/equipamento.model');
const Pedido = require('./models/pedido.model');
const models = require('./models');
const { raw } = require('body-parser');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let itens = [
    {id: 1, nome: "Pão", preco: 10.50},
    {id: 2, nome: "Farinnha de rosca", preco: 7.00},
    {id: 3, nome: "Salgadinho de queijo", preco: 5.50}
];

app.get('/homeItens', (req, res) => {
    res.render('homeItens', {itens});
});

app.get('/', (req, res) => {
    res.render('home', { itens });
});

app.get('/itens', async(req, res) => {
    try{
        let itens = await Item.findAll({raw: true});

        res.render('listarItens', { itens })
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar Itens');
    }
    //res.render("listarItens", { itens });
});

app.get('/itens/novo', (req, res) => {
    res.render("cadastrarItens");
});

app.post('/itens/', async(req, res) => {
    
    try {
        await Item.create({ nome: req.body.nome,
            preco: req.body.preco
        });

        res.redirect('/itens');
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao cadastrar item');
    }
    
    
    
    /*const nome = req.body.nome;
    const preco = parseFloat(req.body.preco);

    const novoItem = {
        id: itens.length + 1,
        nome: nome,
        preco: preco
    }

    itens.push(novoItem);
    res.render('listarItens', { itens })*/
});

app.get('/itens/:id', async(req, res) => {
    
    try{
        let item = await Item.findByPk(req.params.id, {raw: true});

        res.render('detalharItem', { item });
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar Item');
    }
    
    /*const id = parseInt(req.params.id);
    const item = itens.find(p => p.id === id);

    if (item) {
        res.render('detalharItem', { item });
    }else{
       res.status(404).send('Item não encontrado');
    }*/
});

app.get('/itens/:id/editar', async(req, res) => {
    
    try{
        let item = await Item.findByPk(req.params.id, {raw: true});

        res.render('editarItem', { item });
    } catch(e) {
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar Item')
    }
    
    
    
    /*const id = parseInt(req.params.id);
    const item = itens.find(p => p.id === id);
    if (!item) return res.status(404).send('Item não encontrado')

    res.render('editarItem', { item });*/
});

app.post('/itens/:id/editar/', async(req, res) => {
    
    try{
        let item = await Item.findByPk(req.params.id);

        item.nome = req.body.nome;
        item.preco = req.body.preco;
        await item.save();

        res.redirect('/itens')
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao editar item');
    }
    
    
    /*const id = parseInt(req.params.id);
    const item = itens.find(p => p.id === id);

    if (!item) return res.status(404).send('Item não encontrado')

    item.nome = req.body.nome;
    item.preco = req.body.preco;
    res.render('listarItens', { itens })*/
});

app.post('/itens/excluir/:id/', async(req, res) => {
    
    try {
        const item = await Item.findByPk(req.params.id);

        await item.destroy();

        res.redirect('/itens');
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao excluir Item');
    }
    
    /*const id = parseInt(req.params.id);
    const index = itens.findIndex(p => p.id === id);
    if(index === -1) return res.status(404).send('Item não encontrado')

    itens.splice(index, 1);
    res.redirect('/itens');*/
});

//funcionario

let funcionarios = [
    {id: 1, nome: "Miguel", funcao: "Padeiro"},
    {id: 2, nome: "Jonathan", funcao: "Forneiro"},
    {id: 3, nome: "Juca", funcao: "Balconista"}
];

app.get('/homeFuncionarios', (req, res) => {
    res.render('homeFuncionarios', { funcionarios });
});

app.get('/funcionarios', async (req, res) => {
    try {
        let funcionarios = await Funcionario.findAll({ raw: true });
        res.render('listarFuncionarios', { funcionarios });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar Funcionários');
    }
});


app.get('/funcionarios/novo', (req, res) => res.render('cadastrarFuncionario'));

app.post('/funcionarios', async (req, res) => {
    try {
        await Funcionario.create({
            nome: req.body.nome,
            funcao: req.body.funcao
        });

        res.redirect('/funcionarios');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao cadastrar funcionário');
    }
});


app.get('/funcionarios/:id', async (req, res) => {
    try {
        let funcionario = await Funcionario.findByPk(req.params.id, { raw: true });

        res.render('detalharFuncionarios', { funcionario });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar funcionário');
    }
});


app.get('/funcionarios/:id/editar', async (req, res) => {
    try {
        let funcionario = await Funcionario.findByPk(req.params.id, { raw: true });

        res.render('editarFuncionarios', { funcionario });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar funcionário');
    }
});


app.post('/funcionarios/:id/editar', async (req, res) => {
    try {
        let funcionario = await Funcionario.findByPk(req.params.id);

        funcionario.nome = req.body.nome;
        funcionario.funcao = req.body.funcao;
        await funcionario.save();

        res.redirect('/funcionarios');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao editar funcionário');
    }
});


app.post('/funcionarios/excluir/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        await funcionario.destroy();

        res.redirect('/funcionarios');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao excluir funcionário');
    }
});


//Cliente

let clientes = [
    {id: 1, nome: "João"},
    {id: 2, nome: "Maria"},
    {id: 3, nome: "Pedro"}
];

app.get('/homeClientes', (req, res) => {
    res.render('homeClientes', { clientes });
});

app.get('/clientes', async (req, res) => {
    try {
        let clientes = await Cliente.findAll({ raw: true });
        res.render('listarClientes', { clientes });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar clientes');
    }
});


app.get('/clientes/novo', (req, res) => res.render('cadastrarClientes'));

app.post('/clientes', async (req, res) => {
    try {
        await Cliente.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        });

        res.redirect('/clientes');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao cadastrar cliente');
    }
});


app.get('/clientes/:id', async (req, res) => {
    try {
        let cliente = await Cliente.findByPk(req.params.id, { raw: true });

        res.render('detalharClientes', { cliente });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar cliente');
    }
});


app.get('/clientes/:id/editar', async (req, res) => {
    try {
        let cliente = await Cliente.findByPk(req.params.id, { raw: true });

        res.render('editarClientes', { cliente });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar cliente');
    }
});


app.post('/clientes/:id/editar', async (req, res) => {
    try {
        let cliente = await Cliente.findByPk(req.params.id);

        cliente.nome = req.body.nome;
        await cliente.save();

        res.redirect('/clientes');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao editar cliente');
    }
});


app.post('/clientes/excluir/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        await cliente.destroy();

        res.redirect('/clientes');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao excluir cliente');
    }
});

// FORNECEDOR

let fornecedores = [
    { id: 1, nome: "Fornecedor1", telefone: "0000-0000" }
];

app.get('/homeFornecedores', (req, res) => {
    res.render('homeFornecedores', { fornecedores });
});


app.get('/fornecedores', async (req, res) => {
    try {
        let fornecedores = await Fornecedor.findAll({ raw: true });
        res.render('listarFornecedores', { fornecedores });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar fornecedores');
    }
});


app.get('/fornecedores/novo', (req, res) => {
    res.render('cadastrarFornecedor');
});


app.post('/fornecedores', async (req, res) => {
    try {
        await Fornecedor.create({
            nome: req.body.nome,
            telefone: req.body.telefone
        });

        res.redirect('/fornecedores');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao cadastrar fornecedor');
    }
});

app.get('/fornecedores/:id', async(req, res) => {
    
    try{
        let fornecedor = await Fornecedor.findByPk(req.params.id, {raw: true});

        res.render('detalharFornecedor', { fornecedor });
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar fornecedor');
    }
    
});

app.get('/fornecedores/:id/editar', async(req, res) => {
    
    try{
        let fornecedor = await Fornecedor.findByPk(req.params.id, {raw: true});

        res.render('editarFornecedor', { fornecedor });
    } catch(e) {
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar fornecedor');
    }
    
});

app.post('/fornecedores/:id/editar/', async(req, res) => {
    
    try{
        let fornecedor = await Fornecedor.findByPk(req.params.id);

        fornecedor.nome = req.body.nome;
        fornecedor.telefone = req.body.telefone;
        await fornecedor.save();

        res.redirect('/fornecedores')
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao editar fornecedor');
    }

});

app.post('/fornecedores/excluir/:id/', async(req, res) => {
    
    try{
        const fornecedor = await Fornecedor.findByPk(req.params.id);

        await fornecedor.destroy();

        res.redirect('/fornecedores');
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao excluir fornecedor');
    }
    
});

//Ingredientes

let ingredientes = [
    { id: 1, nome: "Farinha", quantidade: "10 kg" }
];

app.get('/homeIngredientes', (req, res) => {
    res.render('homeIngredientes', { ingredientes });
});


app.get('/ingredientes', async (req, res) => {
    try {
        let ingredientes = await Ingrediente.findAll({ raw: true });
        res.render('listarIngredientes', { ingredientes });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar ingredientes');
    }
});

app.get('/ingredientes/novo', (req, res) => {
    res.render('cadastrarIngrediente');
});

app.post('/ingredientes', async (req, res) => {
    try {
        await Ingrediente.create({
            nome: req.body.nome,
            quantidade: req.body.quantidade
        });

        res.redirect('/ingredientes');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao cadastrar ingrediente');
    }
});

app.get('/ingredientes/:id', async(req, res) => {
    
    try{
        let ingrediente = await Ingrediente.findByPk(req.params.id, { raw: true });
        res.render('detalharIngredientes', { ingrediente });
    } catch(e){
        console.log(e.message);
        res.status(500).send('Erro ao buscar ingrediente');
    }
});

app.get('/ingredientes/:id/editar', async(req, res) => {
    
    try{
        let ingrediente = await Ingrediente.findByPk(req.params.id, { raw: true });

        res.render('editarIngrediente', { ingrediente });
    } catch(e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar ingrediente');
    }
});

app.post('/ingredientes/:id/editar', async(req, res) => {
    
    try{
        let ingrediente = await Ingrediente.findByPk(req.params.id);

        ingrediente.nome = req.body.nome;
        ingrediente.quantidade = req.body.quantidade;

        await ingrediente.save();

        res.redirect('/ingredientes');
    } catch(e){
        console.log(e.message);
        res.status(500).send('Erro ao editar ingrediente');
    }
});

app.post('/ingredientes/excluir/:id', async(req, res) => {
    
    try{
        const ingrediente = await Ingrediente.findByPk(req.params.id);
        await ingrediente.destroy();

        res.redirect('/ingredientes');
    } catch(e){
        console.log(e.message);
        res.status(500).send('Erro ao excluir ingrediente');
    }
});

//Equipamentos

let equipamentos = [
    { id: 1, nome: "Batedeira", estado: "Bom" }
];

app.get('/homeEquipamentos', (req, res) => {
    res.render('homeEquipamentos', { equipamentos });
});


app.get('/equipamentos', async (req, res) => {
    try {
        let equipamentos = await Equipamento.findAll({ raw: true });
        res.render('listarEquipamentos', { equipamentos });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar equipamentos');
    }
});

app.get('/equipamentos/novo', (req, res) => {
    res.render('cadastrarEquipamento');
});

app.post('/equipamentos', async (req, res) => {
    try {
        await Equipamento.create({
            nome: req.body.nome,
            estado: req.body.estado
        });

        res.redirect('/equipamentos');
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Erro ao cadastrar equipamento');
    }
});

app.get('/equipamentos/:id', async(req, res) => {
    
    try{
        let equipamento = await Equipamento.findByPk(req.params.id, { raw: true });
        res.render('detalharEquipamentos', { equipamento });
    } catch(e){
        console.log(e.message);
        res.status(500).send('Erro ao buscar equipamento');
    }
});

app.get('/equipamentos/:id/editar', async(req, res) => {
    
    try{
        let equipamento = await Equipamento.findByPk(req.params.id, { raw: true });
        res.render('editarEquipamentos', { equipamento });
    } catch(e) {
        console.log(e.message);
        res.status(500).send('Erro ao buscar equipamento');
    }
});

app.post('/equipamentos/:id/editar', async(req, res) => {
    
    try{
        let equipamento = await Equipamento.findByPk(req.params.id);

        equipamento.nome = req.body.nome;
        equipamento.estado = req.body.estado;
        await equipamento.save();

        res.redirect('/equipamentos');
    } catch(e){
        console.log(e.message);
        res.status(500).send('Erro ao editar equipamento');
    }
});

app.post('/equipamentos/excluir/:id', async(req, res) => {
    
    try{
        const equipamento = await Equipamento.findByPk(req.params.id);
        await equipamento.destroy();

        res.redirect('/equipamentos');
    } catch(e){
        console.log(e.message);
        res.status(500).send('Erro ao excluir equipamento');
    }
});

//Pedido



app.get('/homePedido', (req, res) => {
    res.render('homePedido', { Pedido });
});

app.get('/pedido', async(req, res) => {
    
    let pedidos = await Pedido.findAll({
        include: { model: Item, as: 'itens' }
    });

    pedidos = pedidos.map(p => p.get({ plain: true }));

    res.render('listarPedido', { pedidos });
    
    
    /*try{
        let pedido = await Pedido.findAll({raw: true});

        res.render('listarPedido', { pedido })
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar pedido');
    }*/
});

app.get('/pedido/novo', async (req, res) => {
    const itens = await Item.findAll({raw:true});
    res.render("cadastrarPedido", {itens});
});

app.post('/pedido', async (req, res) => {
    try {
        let { cliente, itens } = req.body;

        if (!Array.isArray(itens)) {
            itens = [itens];
        }

        const pedido = await Pedido.create({ cliente });

        const itensSelecionados = await Item.findAll({
            where: { id: itens }
        });

        await pedido.addItens(itensSelecionados);

        res.redirect('/pedido');
    } catch (e) {
        console.error(e);
        res.status(500).send('Erro ao salvar pedido');
    }
});



app.get('/pedido/:id', async(req, res) => {
    
    try{
        let pedido = await Pedido.findByPk(req.params.id, {raw: true});

        res.render('detalharPedido', { pedido });
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar pedido');
    }
});

app.get('/pedido/:id/editar', async(req, res) => {
    
    try{
        let pedido = await Pedido.findByPk(req.params.id, {raw: true});

        res.render('editarPedido', { pedido });
    } catch(e) {
        console.log(e.mensage);
        res.status(500).send('Erro ao buscar pedido')
    }
});

app.post('/pedido/:id/editar/', async(req, res) => {
    
    try{
        let pedido = await Pedido.findByPk(req.params.id);

    
        await pedido.save();

        res.redirect('/pedido')
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao editar pedido');
    }
});

app.post('/pedido/excluir/:id/', async(req, res) => {
    
    try {
        const pedido = await Pedido.findByPk(req.params.id);

        await pedido.destroy();

        res.redirect('/pedido');
    } catch(e){
        console.log(e.mensage);
        res.status(500).send('Erro ao excluir pedido');
    }
});


db.sync().then( ()=>{
    console.log('Banco de dados sincronizado');
}).catch(erro => {
    console.log('Error ao conectar com o banco de dados');
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});