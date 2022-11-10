
import * as dotenv from 'dotenv';
import './database/client.js';
dotenv.config();
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import {fileURLToPath} from 'url';
import commentRouter from './routes/comments.js';
const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({ origin: '*' , exposedHeaders:"token"}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/comments', commentRouter);
const port = process.env.PORT || 3000;

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err.stack);
  // render the error page
  res.status(err.statusCode || 500);
  res.send({
    error: err.message
  });
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
