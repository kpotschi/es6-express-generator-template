import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import http from 'http';
import favicon from 'serve-favicon';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import {
	normalizePort,
	onListening,
	onError,
} from './middleware/app.middleware.js';

const app = express();
export const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

//favicon
app.use(
	favicon(
		path.join(
			fileURLToPath(path.dirname(import.meta.url)),
			'./public/images/favicon.ico'
		)
	)
);

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// server listen
server.listen(port, () => console.log(`Server has started on Port ${port}`));
server.on('error', onError);
server.on('listening', onListening);
