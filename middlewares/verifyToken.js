import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  console.log("llkjl", req);
  const authHeaders = req.headers.authorization;
  if (!authHeaders)
    return res.status(401).send("Access denied. No token provided.");
  const userContext = jwt.verify(authHeaders, process.env.JWT_SECRET);
  if (userContext) {
    req.user = userContext;
    next();
  }
  else return res.status(403).send("Not Authorized");
});

export default verifyToken;
