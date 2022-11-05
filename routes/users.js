import express from 'express';

let usersRouter = express.Router();

import { registerUser, loginUser, getUser } from '../controllers/Auth.js';
import { getAllEmployee, addNewEmployee,getSingleEmployee,updateEmployee,deletePost } from '../controllers/Employee.js';
import verifyToken from '../middlewares/verifyToken.js';

/* GET users listing. */
usersRouter.route("/").get(getAllEmployee);
usersRouter.route("/:id").get(getSingleEmployee).put(verifyToken, updateEmployee).delete(verifyToken, deletePost);
usersRouter.route("/addemployee").post(verifyToken, addNewEmployee);
usersRouter.route("/signup").post(registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', verifyToken, getUser);

export default usersRouter;
