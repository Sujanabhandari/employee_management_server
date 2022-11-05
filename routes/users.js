var express = require('express');
var usersRouter = express.Router();

const {registerUser, loginUser, getUser} = require("../controllers/Auth");

/* GET users listing. */
usersRouter.route("/signup").post(registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', getUser);
module.exports = usersRouter;
