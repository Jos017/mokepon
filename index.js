const express = require("express");
const app = express();

const cors = require("cors");

class Jugador {
  constructor(id) {
    this.id = id;
  }
}

const jugadores = [];

app.use(
  cors({
    origin: "*",
  })
);

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.send(id);
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(8080, () => {
  console.log("Server connected. Port: 8080");
});
