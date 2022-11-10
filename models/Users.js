import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;

const userSchema = new Schema({
  userName: { type: String },
  email: { type: String, unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  role: { type: String},
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  password: { type: String},
});

const User = mongoose.model("User", userSchema);
export default User;
 