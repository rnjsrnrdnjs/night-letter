const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { User, Chat } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app) => {
	app.use('/post', router);

	router.post(`/write`, async (req, res, next) => {
		try {
			const receive = await User.findAll({
				where: {
					mac: {
						[Op.ne]: req.user.mac,
					},
					dday: {
						[Op.ne]: 0,
					},
				},
			});
			if (!receive[0]) {
				return res.json({ success: 'no' });
			}
			const idx = await Math.floor(Math.random() * receive.length);
			const me = await User.findOne({
				where: {
					mac: req.user.mac,
				},
			});
			await Chat.create({
				UserId: me.id,
				content: req.body.content,
				send: me.mac,
				receive: receive[idx].mac,
				read: 1,
			});
			res.json({ success: 'yes' });
		} catch (err) {
			console.error(err);
			next(err);
		}
	});
	router.post(`/reply`, async (req, res, next) => {
		try {
			await Chat.create({
				UserId: req.user.id,
				content: req.body.content,
				send: req.user.mac,
				receive: req.body.mac,
				read: 1,
			});
			res.json({ success: 'yes' });
		} catch (err) {
			console.error(err);
			next(err);
		}
	});
	router.post(`/read`, async (req, res, next) => {
		try {
			await Chat.update({
				read:0,
			},{
				where:{
					receive:req.user.mac,
				},
			});
			res.json({ success: 'yes' });
		} catch (err) {
			console.error(err);
			next(err);
		}
	});
	
};