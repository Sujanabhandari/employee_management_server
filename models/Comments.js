
import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;

const commentSchema = new Schema({
  date: { type: Date, default: Date.now },
  message: {  type: String },
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  employeeId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
