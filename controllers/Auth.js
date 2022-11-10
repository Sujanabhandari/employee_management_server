import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
    const {
      body: { email, password, ...rest }
    } = req;
    const found = await User.findOne({ email });
    if (found) throw new ErrorResponse('User already exists', 403);
    const hash = await bcrypt.hash(password, 5);
    const { _id } = await User.create({ ...rest, email, password: hash });
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    res.json({ token });
  });

const loginUser = asyncHandler(async (req, res, next) => {
    const {
      body: { email, password }
    } = req;
    const found = await User.findOne({ email }).select('+password');
    if (!found) throw new ErrorResponse(`User doesn't exist`, 404);
    
    const match = await bcrypt.compare(password, found.password);
    if (!match) throw new ErrorResponse('Password is incorrect', 400);

    const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
    res.json({ token });
    
  });

const getUser = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (!user) throw new ErrorResponse(`User doesn't exist`, 404);
  res.json(user);
};

export { registerUser, loginUser, getUser };
