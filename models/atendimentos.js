const axios = require('axios');
const moment = require('moment');
const conexao = require('../infraestrutura/database/conection');
const repositorio = require('../repositorios/atendimentos');

class Atendimento {
  
  constructor() {
    this.dataEhValida = ({ data, dataCriacao }) =>
        moment(data).isSameOrAfter(dataCriacao)
    this.clienteEhValido = tamanho => tamanho >= 5

    this.valida = parametros =>
        this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

    this.validacoes = [
        {
            nome: 'data',
            valido: this.dataEhValida,
            mensagem: 'Data deve ser maior ou igual a data atual'
        },
        {
            nome: 'cliente',
            valido: this.clienteEhValido,
            mensagem: 'Cliente deve ter pelo menos cinco caracteres'
        }
    ]
}

  adicionar(atendimento, res) {

    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length }
  }
    const errors = this.valida(parametros)
    const existemErrors = errors.length;

    if (existemErrors){
      return new Promise ((resolve, reject) => reject(errors));
    } else {

      const atendimentoDatado = { ...atendimento, data, dataCriacao };

      const sql ='INSERT INTO Atendimentos SET ? ';

      return repositorio.adiciona(atendimentoDatado)
      .then((results) => {

        const id = null; // results.insertId // todo não implementado
        return { ... atendimento, id };

      });

    }
  }

  listar () {

    return repositorio.listar();

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