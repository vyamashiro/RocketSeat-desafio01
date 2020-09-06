const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;
  
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  
  const verificaId = repositories.findIndex( repository => repository.id === id );

  if (verificaId < 0) {
    return response.status(400).json({ erro: "projeto não encontrado"});
  }
  
  const like = repositories[verificaId].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes: like,
  }

  repositories[verificaId] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  
  const verificaId = repositories.findIndex( repository => repository.id === id );

  if (verificaId < 0) {
    return response.status(400).json({ erro: "projeto não encontrado"});
  }
  
  repositories.splice(verificaId, 1)
    
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const { title, url, techs, likes } = request.body;

  const verificaId = repositories.findIndex( repository => repository.id === id );

  if (verificaId < 0) {
    return response.status(400).json({ erro: "projeto não encontrado"});
  }

  const like = repositories[verificaId].likes + 1;
  
  const repository = {
    id,
    title,
    url,
    techs,
    likes: like,
  }

  repositories[verificaId] = repository;

  return response.json(repository);
});

module.exports = app;
