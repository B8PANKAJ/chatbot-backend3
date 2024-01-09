const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});
const Usermodel = new mongoose.model("ChatBotUser", UserSchema);
module.exports = Usermodel;
