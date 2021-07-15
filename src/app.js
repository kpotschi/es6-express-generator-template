import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

import indexRouter from '../routes/index.js';
import usersRouter from '../routes/users.js';

export const app = express();

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	express.static(
		path.join(fileURLToPath(path.dirname(import.meta.url)), '../public')
	)
);

//favicon

app.use(
	'/favicon.ico',
	express.static(
		path.join(
			fileURLToPath(path.dirname(import.meta.url)),
			'../public/images/favicon.ico'
		)
	)
);

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
