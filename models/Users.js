const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, minLength: 2, maxLength: 255 },
  email: { type: String, unique: true, required: true, required: [true, 'Password is required'] },
  firstName: { type: String, minLength: 2, maxLength: 255},
  lastName: { type: String, minLength: 2, maxLength: 255 },
  profilePic: { type: String},
  address: { type: String, minLength: 2, maxLength: 255 },
  role: { type: String},
  date: { type: Date, default: Date.now },
  password: { type: String},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
