const moment = require('moment');
const conexao = require('../infraestrutura/database/conection');
const upload = require('../infraestrutura/arquivos/upload');

class Pet {

  adicionar(pet, res){

    const query = 'INSERT INTO Pets SET ?';

    upload(pet.imagem, pet.nome, (erro, novoCaminho) => {

      if (erro){

        res.status(400).json(erro);

      } else {

        const novoPet = { nome: pet.nome, imagem: novoCaminho };

        conexao.query(query, novoPet, erro => {
          if (erro){
           res.status(400).json(erro);
          } else {
            res.status(200).json(novoPet);
          }
        })

      }

    })
  }
}

module.exports = new Pet();