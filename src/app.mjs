import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

import indexRouter from '../routes/index.mjs';
import usersRouter from '../routes/users.mjs';

export const app = express();

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(fileURLToPath(path.dirname(import.meta.url)), '../public')));


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
