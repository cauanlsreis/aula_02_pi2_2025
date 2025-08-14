const express = require('express');
const app = express();
const port = 3000;

//Midleware
app.use(express.json());

//Simular a persistência na memória do servidor usando um array
let usuarios = [];
let idCounter = 1;

//Criar a rota POST
app.post('/usuarios', (req, res) => {
  const { nome, idade } = req.body;
  const novoUsuario = { id: idCounter++, nome, idade };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

//Criar a rota listar todos (GET)
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

//Criar a rota de atualização/update total (PUT)
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade } = req.body;
    const usuario = usuarios.find(u => u.id == id);
    if (!usuario) return res.status(404).json({ erro: `Usuário com ID ${id} não encontrado` });

    usuario.nome = nome;
    usuario.idade = idade;
    res.json(usuario);
});

//Criar a rota de atualização/update parcial (PATCH)
app.patch('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: `Usuário com ID ${id} não encontrado` });

  // Atualiza apenas os campos enviados no JSON
  Object.assign(usuario, req.body);
  res.json(usuario);
});

//Criar a rota de remoção (DELETE)
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(204).send(); // No Content
});

// Subir o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});