const axios = require('axios');
const moment = require('moment');
const conexao = require('../database/conection');

class Atendimento {

  adicionar(atendimento, res) {

    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    // Validação de data e validação do tamanho do cliente
    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: 'data',
        valido: dataValida,
        mensagem: 'Data deve ser maior que a atual'
      },
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Cliente deve ter ao menos 5 caracteres'
      }
    ];

    const errors = validacoes.filter ( campo => !campo.valido );
    const existemErrors = errors.length;

    if (existemErrors){
      res.status(400).send(errors);
    } else {

      const atendimentoDatado = { ...atendimento, data, dataCriacao };

      const sql ='INSERT INTO Atendimentos SET ? ';

      conexao.query(sql, atendimentoDatado, (erro, results) => {
        if(erro){
         res.status(400).json(erro);
        }else{
          res.status(201).json( atendimento );
        }
      })

    }

  }

  listar (res) {

    const sql = 'SELECT * FROM Atendimentos';

    conexao.query(sql, (erro, results) => {

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(results);
      }
    })

  }

  buscarId (id, res) {

    const sql = `SELECT * FROM Atendimentos where id = ${id} `;

    conexao.query(sql, async (erro, results) => {

      const resultado = results[0];
      const cpf = resultado.cliente;
      
      if (erro) {
        res.status(400).json(erro);
      } else {

        const { data } = await axios.get(`http://localhost:8082/${cpf}`);

        resultado.cliente = data;

        res.status(200).json(resultado);
      }
    })
  }

  alterar (id, values, res) {

    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const sql = `UPDATE Atendimentos SET ? WHERE id = ? `;

    conexao.query(sql, [values, id], (erro, results) => {
      
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ... values, id });
      }
    })
  }

  deletar (id, res) {

    const sql = `DELETE FROM Atendimentos WHERE id = ? `;

    conexao.query(sql, id, (erro, results) => {
      
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    })
  }

}

module.exports = new Atendimento;