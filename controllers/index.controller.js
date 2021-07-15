import { fileURLToPath } from 'url';
import path from 'path';

export const indexController = (req, res, next) => {
	res.sendFile(
		path.join(
			fileURLToPath(path.dirname(import.meta.url)),
			'../public/index.html'
		)
	);
};
