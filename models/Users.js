import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;

const userSchema = new Schema({
  userName: { type: String, minLength: 2, maxLength: 255 },
  email: { type: String, unique: true },
  firstName: { type: String, minLength: 2, maxLength: 255},
  lastName: { type: String, minLength: 2, maxLength: 255 },
  profilePic: { type: String},
  address: { type: String, minLength: 2, maxLength: 255 },
  role: { type: String},
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  password: { type: String},
});

const User = mongoose.model("User", userSchema);
export default User;
