

const UserModel = require('../schema/UserModel'); 

// Função para criar um exercício
exports.createUser = async (req, res) => {
  try {
    const { nome, password, email } = req.body;
    const newUser = new UserModel({ nome, password, email });
    await newUser.save();
     res.status(200).json({ message: 'Usuário criado com sucesso!', User: newUser });
  } catch (error) {
    console.error('Erro ao criar um usuário:', error);
    res.status(500).json({ error: 'Erro ao criar um usuário' });
  }
};

// Função para fazer login de um usuário
exports.loginUser = async (req, res) => {
  try {
    const { nome, password } = req.body;
    const loginUser = new UserModel({ nome, password });

    const userToLog = await UserModel.findOne({ nome: loginUser.nome }).exec();

    console.log(req)

    console.log(userToLog)
    console.log(loginUser)
    if(userToLog.nome === loginUser.nome && userToLog.password === loginUser.password){
      res.status(200).json({ message: 'Usuário logado com sucesso!', usuario: userToLog });
    }
  } catch (error) {
    console.error('Erro ao criar um usuário:', error);
    res.status(500).json({ error: 'Erro ao criar um usuário' });
  }
};

// Função para atualizar um exercício
exports.updateUser  = async (req, res) => {
  try {
    // const id = req.params.id;
    // const { data, tipoExercicio, peso, repeticao, notas } = req.body;
    // const exerciceToUpdate = await ExercicesModel.findById(id);

    // if (!exerciceToUpdate) {
    //   return res.status(404).json({ error: 'Usuário não encontrado' });
    // }

    // exerciceToUpdate.data = data;
    // exerciceToUpdate.tipoExercicio = tipoExercicio;
    // exerciceToUpdate.peso = peso;
    // exerciceToUpdate.repeticao = repeticao;
    // exerciceToUpdate.notas = notas;

    // await exerciceToUpdate.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso!', exercice: exerciceToUpdate });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// Função para buscar um exercício por ID
exports.getExerciceByUser = async (req, res) => {
  try {
    // const id = req.params.id;
    // const exercice = await ExercicesModel.findById(id);

    if (!exercice) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(exercice);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
  }
};

// Função para buscar todos os exercícios
exports.getAllUsers = async (req, res) => {
  try {
    const exercices = await ExercicesModel.find({});
    res.status(200).json(exercices);
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar todos os usuários' });
  }
};

// Função para excluir um exercício por ID
exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const resultado = await ExercicesModel.findByIdAndDelete(_id);

    if (!resultado) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'usuário excluído com sucesso!', resultado });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};
