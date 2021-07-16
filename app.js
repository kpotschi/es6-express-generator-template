import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
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
export const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');

//view engine setup
app.set('view engine', 'ejs');

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

//error handling

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
