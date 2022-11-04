var express = require('express');
var usersRouter = express.Router();

const {registerUser} = require("../controllers/Auth");

/* GET users listing. */
usersRouter.route("/signup").post(registerUser);
module.exports = usersRouter;
