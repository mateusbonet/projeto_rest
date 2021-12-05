const Atendimento = require('../models/atendimentos');

module.exports  = app => {

  app.get('/atendimentos', (req, res) => {
    
    Atendimento.listar(res);

  });

  app.get('/atendimento/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.buscarId(id, res);

  });

  app.post('/atendimentos', (req, res) => {
    
    const atendimento = req.body;

    Atendimento.adicionar(atendimento, res);
    
  })

  app.patch('/atendimentos/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    const values = req.body;

    Atendimento.alterar(id, values, res);

  });

  app.delete('/atendimentos/:id', (req, res) => {
    
    const id = parseInt(req.params.id);

    Atendimento.deletar(id, res);

  });

}