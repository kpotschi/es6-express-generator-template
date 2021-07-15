import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import http from 'http';
import debug from 'debug';
import favicon from 'serve-favicon';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

const server = http.createServer(app);
const debugImport = debug('es6-express-template:server');

const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
};

const onError = (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	switch (error.code) {
		case 'EACCES':
			console.error('Port/Pipe requires elevated privileges');
			process.exit(1);
		case 'EADDRINUSE':
			console.error('Port is already in use');
			process.exit(1);
		default:
			throw error;
	}
};

const onListening = () => {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

	debugImport('Listening on ' + bind);
};

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
