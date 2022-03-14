const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [{
  id: 'f6b5cac9-d24e-4db3-9a99-97521e793bef',
  title: 'Umbriel',
  url: 'https://github.com/Rocketseat/umbriel',
  techs: [ 'Node', 'Express', 'TypeScript' ],
  likes: 0
}];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => { 
  const { id } = request.params;
  const updateRepo = request.body

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  if(updateRepo.likes){
    updateRepo.likes = repositories[repositoryIndex].likes
  }

  const repository = {
    ...repositories[repositoryIndex],
    ...updateRepo
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }
   
  repository.likes++

  return response.json(repository);
});

module.exports = app;
