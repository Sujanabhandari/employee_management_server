import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * In the requirement csv file doesn't have email field.
 * It means user should be able to import employees without
 * any required fields.
 * Hence, email and username are not unique right now.
 * 
 * TODO : Ask this requirement during test case feedback.
 * TODO : Change email and firtname constraints accordingly.
 */
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
