const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");

class Jugador {
  constructor(id) {
    this.id = id;
  }

  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
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

app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const nombre = req.body.mokepon || "";
  const mokepon = new Mokepon(nombre);

  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon);
  }
  console.log("jugadores", jugadores);
  res.end();
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(8080, () => {
  console.log("Server connected. Port: 8080");
});
