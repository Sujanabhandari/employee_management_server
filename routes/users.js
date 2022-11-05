var express = require('express');
var usersRouter = express.Router();

const {registerUser, loginUser, getUser} = require("../controllers/Auth");
const 
    verifyToken
   = require("../middlewares/verifyToken");

/* GET users listing. */
usersRouter.route("/signup").post(registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', verifyToken,getUser);
module.exports = usersRouter;
