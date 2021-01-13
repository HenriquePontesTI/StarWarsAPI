import mongoose from "mongoose";

const PlanetSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  clima: { type: String, required: true },
  terreno: { type: String, required: true },
  filmes: { type: Number, required: false }
});

const Planet = mongoose.model("planets", PlanetSchema);

export default Planet;
