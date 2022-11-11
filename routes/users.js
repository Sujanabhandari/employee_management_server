import express from 'express';

let usersRouter = express.Router();

import { registerUser, loginUser, getUser } from '../controllers/Auth.js';
import { getAllEmployee, addEmployees, getSingleEmployee,updateEmployee,deleteEmployee } from '../controllers/Employee.js';
import verifyToken from '../middlewares/verifyToken.js';

/* GET users listing. */
usersRouter.route("/users").get(verifyToken, getAllEmployee).post(verifyToken, addEmployees);
usersRouter.route("/signup").post(registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/users/me', verifyToken, getUser);
usersRouter.route("/users/:id").get(verifyToken, getSingleEmployee).put(verifyToken, updateEmployee).delete(verifyToken, deleteEmployee);

export default usersRouter;
