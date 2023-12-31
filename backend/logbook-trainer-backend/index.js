const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const exerciceController = require("./controllers/ExercicesController"); // Substitua 'caminho-para-o-seu-exercice-controller' pelo caminho correto para o seu controlador
const userController = require("./controllers/UserController"); // Substitua 'caminho-para-o-seu-exercice-controller' pelo caminho correto para o seu controlador

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
};

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB (substitua 'mongodb://localhost/nome-do-banco' pelo URL do seu banco de dados)


// Rota para criar um exercício
app.post("/api/save", exerciceController.createExercice);

// Rota para atualizar um exercício
app.post("/api/update/:id", exerciceController.updateExercice);

// Rota para buscar um exercício por ID
app.get("/api/exercice/:id", exerciceController.getExerciceById);

// Rota para buscar todos os exercícios
app.get("/api/exercices/:usuarioId", exerciceController.getAllExercices);

// Rota para excluir um exercício
app.post("/api/delete", exerciceController.deleteExercice);

app.post("/api/user/save", userController.createUser);

app.post("/api/user/login", userController.loginUser);

let client = null;
const connectToMongoDB = async () => {
  try {
    client = await mongoose.connect("mongodb://localhost:27017/loogbook", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Servidor iniciado na porta " + (process.env.PORT || 5000));
    });
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error);
    process.exit(1);
  }
};

connectToMongoDB();

module.exports = app;
