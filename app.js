const express = require("express");
const mysql = require('mysql2');
const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
    res.write("Hello world");
    console.log("Hello world");
    res.end();
});

app.listen(port);