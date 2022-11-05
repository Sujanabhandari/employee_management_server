const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const {asyncHandler} = require("../utils/asyncHandler.js");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res, next) => {
    const {
      body: { email, password, ...rest }
    } = req;
    const found = await User.findOne({ email });
    console.log(found);
    if (found) throw new ErrorResponse('User already exists', 403);
    const hash = await bcrypt.hash(password, 5);
    const { _id } = await User.create({ ...rest, email, password: hash });
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
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

const getUser = asyncHandler(async (req, res, next) => {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse(`User doesn't exist`, 404);
    res.json(user);
  });

module.exports = { registerUser, loginUser, getUser };
