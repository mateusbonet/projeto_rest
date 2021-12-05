const conexao = require('./conection');

const executaQuery = (query, parametros = '') => {

  return new Promise((resolve, reject) => {

    conexao.query( query, parametros, (error, results, campos) => {
    
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

module.exports = executaQuery;