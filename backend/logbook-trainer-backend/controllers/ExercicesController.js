const ExercicesModel = require('../schema/ExercicesModel'); // Importe o modelo adequado

// Função para criar um exercício
exports.createExercice = async (req, res) => {
  try {
    const { data, tipoExercicio, peso, repeticao, notas, usuarioId } = req.body;
    const newExercice = new ExercicesModel({ data, tipoExercicio, peso, repeticao, notas, usuarioId });
    await newExercice.save();
    res.status(201).json({ message: 'Exercício criado com sucesso!', exercice: newExercice });
  } catch (error) {
    console.error('Erro ao criar exercício:', error);
    res.status(500).json({ error: 'Erro ao criar exercício' });
  }
};

// Função para atualizar um exercício
exports.updateExercice = async (req, res) => {
  try {
    const id = req.params.id;
    const exerciceToUpdate = await ExercicesModel.findById(id);
    const { data, tipoExercicio, peso, repeticao, notas } = req.body;

    if (!exerciceToUpdate) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }

    exerciceToUpdate.data = data;
    exerciceToUpdate.tipoExercicio = tipoExercicio;
    exerciceToUpdate.peso = peso;
    exerciceToUpdate.repeticao = repeticao;
    exerciceToUpdate.notas = notas;

    await exerciceToUpdate.save();
    res.status(200).json({ message: 'Exercício atualizado com sucesso!', exercice: exerciceToUpdate });
  } catch (error) {
    console.error('Erro ao atualizar exercício:', error);
    res.status(500).json({ error: 'Erro ao atualizar exercício' });
  }
};

// Função para buscar um exercício por ID
exports.getExerciceById = async (req, res) => {
  try {
    const id = req.params.id;
    

    const exercice = await ExercicesModel.findById(id);

    if (!exercice) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }

    res.status(200).json(exercice);
  } catch (error) {
    console.error('Erro ao buscar exercício por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar exercício por ID' });
  }
};

// Função para buscar todos os exercícios
exports.getAllExercices = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;

    const exercices = await ExercicesModel.find({ usuarioId: usuarioId }).sort({ data: -1 }).exec();
    res.status(200).json(exercices);
  } catch (error) {
    console.error('Erro ao buscar todos os exercícios:', error);
    res.status(500).json({ error: 'Erro ao buscar todos os exercícios' });
  }
};

// Função para excluir um exercício por ID
exports.deleteExercice = async (req, res) => {
  try {
    const { _id } = req.body;
    const resultado = await ExercicesModel.findByIdAndDelete(_id);

    if (!resultado) {
      return res.status(404).json({ message: 'Exercício não encontrado' });
    }

    res.status(200).json({ message: 'Exercício excluído com sucesso!', resultado });
  } catch (error) {
    console.error('Erro ao excluir exercício:', error);
    res.status(500).json({ error: 'Erro ao excluir exercício' });
  }
};

