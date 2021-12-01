const express = require('express');

const app = express();

app.listen(3000, console.log('Servidor rodando da porta 3000!'));

app.get('/atendimentos', (req, res) => {
  res.send('Rota de atendimentos!');
});