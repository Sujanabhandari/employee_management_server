
import Comment from "../models/Comments.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from '../utils/ErrorResponse.js';

const createNewComment = asyncHandler(async (req, res, next) => {
  let newComment = await Comment.create({
    message: req.body.message, 
    employeeId: req.body.employeeId,
    authorId: req.body.authorId
  });
  newComment = await Comment.findById(newComment).populate([{
    path: 'authorId',
    select: ["email", "userName", "firstName","lastName", "role"],
  }]);
  res.status(201).json(newComment);
});

const getAllComments = asyncHandler(async (req, res, next) => {
  const condition = req.query;
  const comments = await Comment.find(condition).populate(
    {
      path: "authorId",
      select: ["email", "userName", "firstName","lastName", "role"],
    },
  ).populate({
    path: "employeeId",
    select: ["email", "userName", "firstName","lastName", "role"],
  },).sort('-date');
  res.json(comments);
});



export {
  createNewComment,
  getAllComments,
};
