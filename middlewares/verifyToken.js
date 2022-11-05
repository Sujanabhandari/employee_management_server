import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";

// const verifyToken = asyncHandler(async (req, res, next) => {
//   const authHeaders = req.headers.authorization;
//   if (!authHeaders)
//     return res.status(401).send("Access denied. No token provided.");
//   const userContext = jwt.verify(authHeaders, process.env.SECRET_KEY);
//   if (userContext) {
//     req.user = userContext;
//     next();
//   }
//   else return res.status(403).send("Not Authorized");
// });

const verifyToken = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders)
    return res.status(401).send("Access denied. No token provided.");

  try {
    //It gets the token and decodes the information
    const userContext = jwt.verify(authHeaders, process.env.SECRET_KEY);

    if (userContext) {
      req.user = userContext;
      next();
    }
    else return res.status(403).send("Not Authorized");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
}
export default verifyToken;
