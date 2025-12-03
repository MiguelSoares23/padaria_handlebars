const express = require('express');
const exphbs = require('express-handlebars');

const db = require('./config/database');
const Item =  require('./models/item.model');
const Funcionario = require('./models/funcionario.model');
const Cliente = require('./models/cliente.model');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
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


db.sync().then( ()=>{
    console.log('Banco de dados sincronizado');
}).catch(erro => {
    console.log('Error ao conectar com o banco de dados');
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});