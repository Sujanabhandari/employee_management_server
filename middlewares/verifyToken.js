const jwt = require("jsonwebtoken");
const {asyncHandler} = require("../utils/asyncHandler.js");

const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization }
  } = req;

  if (!authorization) return res.status(401).send("Access denied. No token provided.");;
  const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
  req.userId = _id;
  next();
});
module.exports = verifyToken;
