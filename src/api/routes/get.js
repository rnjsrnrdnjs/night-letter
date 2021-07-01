const express = require('express');
const router = express.Router();
const { User,Chat } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

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
			const chats=await Chat.findAll({
				where:{
					[Op.or]: [{send: req.session.uuid}, {receive: req.session.uuid}],
				}
			});
			const send=[];
			const receive=[];
			const map=new Map();
			
			console.log(chats);
			res.render('main',{
				chats:chats,
			});
		} catch (err) {
			console.error(err);
		}
	});
};