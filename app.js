import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import http from 'http';
import favicon from 'serve-favicon';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import createError from 'http-errors';
import {
	normalizePort,
	onListening,
	onError,
} from './middleware/app.middleware.js';

const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');

//view engine setup
app.set('view engine', 'ejs');

// middleware setup

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
app.use('/', morgan('common'), indexRouter);
app.use('/users', usersRouter);

// server listen
server.listen(port, () => console.log(`Server has started on Port ${port}`));
server.on('error', onError);
server.on('listening', onListening);

//error handling
app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

export { server };
