var express = require('express');
var usersRouter = express.Router();

const {registerUser, loginUser, getUser} = require("../controllers/Auth");
const {getAllEmployee, addNewEmployee,getSingleEmployee,updateEmployee,deletePost} = require("../controllers/Employee");
const 
    verifyToken
   = require("../middlewares/verifyToken");

/* GET users listing. */
usersRouter.route("/").get(getAllEmployee);
usersRouter.route("/:id").get(getSingleEmployee).put(verifyToken, updateEmployee).delete(verifyToken, deletePost);
usersRouter.route("/addemployee").post(verifyToken, addNewEmployee);
usersRouter.route("/signup").post(registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', verifyToken,getUser);
module.exports = usersRouter;