import debug from 'debug';
import { server } from '../app.js';

const debugImport = debug('es6-express-template:server');

export const onListening = () => {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	// is this reachable?
	debugImport('Listening on ' + bind);
};

export const onError = (error) => {
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

export const normalizePort = (val) => {
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
