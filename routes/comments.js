import express from 'express';

let commentRouter = express.Router();

import verifyToken from '../middlewares/verifyToken.js';
import { createNewComment,getAllComments } from '../controllers/Comment.js';

commentRouter.route("/").get(verifyToken, getAllComments).post(verifyToken, createNewComment);

export default commentRouter;
