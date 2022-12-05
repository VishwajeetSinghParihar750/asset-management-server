const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  teams: [
    {
      teamName: String,
      teamId: mongoose.SchemaTypes.ObjectId,
      description: String,
      category: String,
    },
  ],
  messages: [
    {
      adminName: String,
      adminEmail: String,
      teamId: mongoose.SchemaTypes.ObjectId,
      teamName: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
