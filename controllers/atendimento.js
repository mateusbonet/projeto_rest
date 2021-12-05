const Atendimento = require('../models/atendimentos');

module.exports  = app => {

  app.get('/atendimentos', (req, res) => {
    
    Atendimento.listar()
    .then(results => res.status(200).json(results))
    .catch(errors => res.status(400).json(error));

  });

  app.get('/atendimento/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.buscarId(id, res);

  });

  app.post('/atendimentos', (req, res) => {
    
    const atendimento = req.body;

    Atendimento.adicionar(atendimento)
      .then(atendimentoCadastrado => 
        res.status(200).json(atendimentoCadastrado)
      )
      .catch( error => res.status(400).json(error));
    
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