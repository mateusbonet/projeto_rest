const customExpress = require('./config/customExpress');
const conexao = require('./database/conection');
const Tables = require('./database/tables');

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