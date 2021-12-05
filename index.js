const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conection');
const Tables = require('./infraestrutura/database/tables');

conexao.connect((error) => {
  if(error){
    console.log(error);
  } else {
    
    console.log('Conectado com sucesso!');

    Tables.init(conexao);
    
    const app = customExpress();

    app.listen(3000, console.log('Servidor rodando da porta 3000!')); 

  }
})