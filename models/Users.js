import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;

const userSchema = new Schema({
  userName: { type: String },
  email: { type: String},
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String },
  street: { type: String },
  postcode: { type: String },
  city: { type: String },
  housenumber: { type: String },
  country: { type: String },
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  password: { type: String},
});

const User = mongoose.model("User", userSchema);
export default User;
