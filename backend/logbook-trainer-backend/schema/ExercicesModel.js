const mongoose = require('mongoose');

const exerciceSchema = new mongoose.Schema({
    data: String,
    tipoExercicio: String,
    peso: String,
    repeticao: String,
    notas: String,
    usuarioId: String,
    
});

const ExercicesModel = mongoose.model('exercicios', exerciceSchema);



module.exports = ExercicesModel;

