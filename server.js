const express = require('express');
const exphbs = require('express-handlebars');
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

app.get('/', (req, res) => {
    res.render('home', { itens });
});

app.get('/itens', (req, res) => {
    res.render("listarItens", { itens });
});

app.get('/itens/novo', (req, res) => {
    res.render("cadastrarItens");
});

app.post('/itens/', (req, res) => {
    const nome = req.body.nome;
    const preco = parseFloat(req.body.preco);

    const novoItem = {
        id: itens.length + 1,
        nome: nome,
        preco: preco
    }

    itens.push(novoItem);
    res.render('listarItens', { itens })
});

app.get('/itens/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = itens.find(p => p.id === id);

    if (item) {
        res.render('detalharItem', { item });
    }else{
       res.status(404).send('Item não encontrado');
    }
});

app.get('/itens/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const item = itens.find(p => p.id === id);
    if (!item) return res.status(404).send('Item não encontrado')

    res.render('editarItem', { item });
})

app.post('/itens/:id/editar/', (req, res) => {
    const id = parseInt(req.params.id);
    const item = itens.find(p => p.id === id);

    if (!item) return res.status(404).send('Item não encontrado')

    item.nome = req.body.nome;
    item.preco = req.body.preco;
    res.render('listarItens', { itens })
});

app.post('/itens/excluir/:id/', (req, res) => {
    const id = parseInt(req.params.id);
    const index = itens.findIndex(p => p.id === id);
    if(index === -1) return res.status(404).send('Item não encontrado')

    itens.splice(index, 1);
    res.redirect('/itens');
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

app.get('/funcionarios', (req, res) => {
    res.render('listarFuncionarios', { funcionarios })
});

app.get('/funcionarios/novo', (req, res) => res.render('cadastrarFuncionario'));

app.post('/funcionarios/', (req, res) => {
    const nome = req.body.nome;
    const funcao = req.body.funcao;

    const NovoFuncionario = {
        id: funcionarios.length + 1,
        nome: nome,
        funcao: funcao
    }

    funcionarios.push(NovoFuncionario);
    res.render('listarFuncionario', { funcionarios});
});

app.get('/funcionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(p => p.id === id);

    if (funcionarios) {
        res.render('detalharFuncionarios', { funcionario});
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.get('/funcionarios/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(p => p.id === id);
    if(!funcionario) return res.status(404).send('Funcionário não encontrado')
    
    res.render('editarFuncionarios', { funcionario });
});

app.post('/funcionario/:id/editar/', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(p => p.id === id);

    if(!funcionario) return res.status(404).send('Funcionário não encontrado')

        funcionario.nome = req.body.nome;
        funcionario.funcao = req.body.funcao;
        res.render('listarFuncionarios', { funcionarios })
});


            


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});