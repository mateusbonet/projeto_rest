const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {
  
  const tiposValidos = ['jpg', 'png', 'jpeg'];
  const tipo = path.extname(caminho);
  const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

  if (tipoValido){
  
    const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`;
  
    fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(novoCaminho))
    .on('finish', () => {
      callbackImagemCriada(false, novoCaminho);
      });

  } else {

    const erro = 'Tipo inválido de arquivo';
    console.log('Tipo inválido de arquivo');
    callbackImagemCriada(erro);
    
  }
}