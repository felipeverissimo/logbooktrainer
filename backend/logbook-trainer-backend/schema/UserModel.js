const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: String,
  password: String,
  email: String,
});

userSchema.methods.save = async function () {
  return Promise.resolve(this);
};

userSchema.methods.findOneAsync = async function (conditions) {
  const user = await this.findOne(conditions);
  return user ? user.toObject() : null;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
