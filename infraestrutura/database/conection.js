const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mateus102021',
    database: 'agenda-petshop'
});

module.exports = conexao;