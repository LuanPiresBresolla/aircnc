const User = require('../models/User');

module.exports = {
  async store(req, res){
    const { email } = req.body;

    let user = await User.findOne({ email }); // Verifica se já existe o usuário

    if(!user){
        user = await User.create({ email }); // Cadastra o usuário
    }

    return res.json(user);
  }
};