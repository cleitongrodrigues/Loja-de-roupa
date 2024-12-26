const express = require("express");
const mysql = require('mysql2');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

// Adicionar Bootstrap
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));

// Configuração do Express-Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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
    console.log("Conexao estabelicida com sucesso")   
});

// Rota principal
app.get("/", (req, res) => {
    res.render('formulario');
});

app.listen(port);