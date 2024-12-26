const express = require("express");
const mysql = require('mysql2');
const { engine } = require('express-handlebars');
const app = express();
const fileupload = require("express-fileupload");
const port = 3000;

// Habilitando upload de arquivos
app.use(fileupload());

// Adicionar Bootstrap
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));

// Adicionando CSS
app.use("/css", express.static("./css"));

// Configuração do Express-Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Manipulando dados via rotas
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// Estabelecendo a conexao com o banco de dados
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja"
});

conexao.connect((error) => {
    if (error){
        console.log("Erro ao conectar ao banco de dados")
    return;
    }
    console.log(`Conexao estabelicida com sucesso na porta ${port}`)   
});

// Rota principal
app.get("/", (req, res) => {
    // SQL
    let sql = `select * from Produtos`

    conexao.query(sql, (erro, retorno) => {
        res.render('formulario', { produtos:retorno });
    });
});

// Rota de cadastro
app.post("/cadastrar", (req, res) => {
    // obter os dados que serao utilizados para o cadastro
    let nome = req.body.nome;
    let valor = req.body.valor;
    let imagem = req.files.imagem.name;

    // Comando SQL
    let sql = `insert into Produtos (Nome_Produto, Valor_Produto, Img_Produto) VALUES ('${nome}', ${valor}, '${imagem}')`;

    // Executa o camndo SQL
    conexao.query(sql, (erro, retorno) => {
        if (erro) throw erro;

        // caso ocorra o cadastro
        req.files.imagem.mv(__dirname + '/imagens/' + req.files.imagem.name);
        console.log(retorno);
    });

    // Retornar para a rota principal
    res.redirect("/");

    // Evita loop infinito
    // res.end();
})

app.listen(port);

// paramos aqui, https://www.youtube.com/watch?v=nG027HRjlgM&list=PLWXw8Gu52TRI5NJmexwA9qco33goFxbHK&index=17&ab_channel=RalfLima