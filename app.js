// Import the necessary modules
const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");

// Initialize the Express application
const app = express();

// Use the Morgan middleware for logging
app.use(morgan("dev"));

// Define the homepage route
app.get("/", (req, res) => {
  const pokemonList = pokeBank.list();
  let html = "<h1>Pokedex</h1>";
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
  });
  res.send(html);
});

// Define the Pokemon details route
app.get("/pokemon/:id", (req, res) => {
  const pokemon = pokeBank.find(req.params.id);
  if (!pokemon) {
    res.status(404).send("Pokemon not found");
  } else {
    let html = `<h1>${pokemon.name}</h1>`;
    html += `<p>Type: ${pokemon.type}</p>`;
    html += `<p>Trainer: ${pokemon.trainer}</p>`;
    html += `<p>Date: ${pokemon.date}</p>`;
    res.send(html);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

`<!DOCTYPE html>
<html>
  <head>
    <title>My Pokedex</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="pokemon-list">
      <header><img src="/logo.png" />Pokedex</header>
      ${pokemon
        .map(
          (pokemon) => `
      <div class="pokemon-item">
        <img class="pokemon-img" src={pokemon.image} />
        <p>
          <span class="pokemon-position">${pokemon.id}. ▲</span>${pokemon.name}
          <small>(Trained by ${pokemon.trainer})</small>
        </p>
        <small class="pokemon-info">
          Type: ${pokemon.type} | Date Caught: ${pokemon.date}
        </small>
      </div>
      `
        )
        .join("")}
    </div>
  </body>
</html>
`;
