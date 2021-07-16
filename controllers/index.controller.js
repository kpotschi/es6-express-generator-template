import navObj from '../data/navbar.data.js';

export const indexController = (req, res, next) => {
	res.render('index', { title: 'Test Express', nav: navObj });
};
