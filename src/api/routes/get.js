const express = require('express');
const router = express.Router();

module.exports = (app) => {
	app.use('/', router);
	router.use((req, res, next) => {
		/* res.locals 값추가 가능*/
		next();
	});

	router.get('/', async (req, res, next) => {
		try {
			res.render('load');
		} catch (err) {
			console.error(err);
		}
	});
	router.get('/main', async (req, res, next) => {
		try {
			res.render('main',{});
		} catch (err) {
			console.error(err);
		}
	});
};