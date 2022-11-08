import express from 'express';

let usersRouter = express.Router();

import { registerUser, loginUser, getUser } from '../controllers/Auth.js';
import { getAllEmployee, addEmployees, getSingleEmployee,updateEmployee,deletePost } from '../controllers/Employee.js';
import verifyToken from '../middlewares/verifyToken.js';

/* GET users listing. */
usersRouter.route("/").get(getAllEmployee).post(verifyToken, addEmployees);
usersRouter.route("/signup").post(registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', verifyToken, getUser);
usersRouter.route("/:id").get(verifyToken, getSingleEmployee).put(verifyToken, updateEmployee).delete(verifyToken, deletePost);

export default usersRouter;
