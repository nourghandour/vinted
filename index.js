const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2; // On n'oublie pas le `.v2` à la fin

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(userRoutes);
app.use(offerRoutes);

// Ceci est une route pour dire boujour
app.get("/", (req, res) => {
  res.json("Bienvenue sur mon serveur");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started 🧦");
});
