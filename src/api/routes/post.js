const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { User,Chat } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 


module.exports = (app) => {
	app.use('/post', router);

	router.post(`/makeUUID`, async (req, res, next) => {
		try {
			let uuid = await uuidv4();
			await User.create({
				mac: uuid,
				dday: 30,
			});
			req.session.uuid =await uuid;
			await res.json({ uuid: uuid });
		} catch (err) {
			console.error(err);
			next(err);
		}
	});
	router.post(`/loginUUID`, async (req, res, next) => {
		try {
			const user = await User.findOne({
				mac: req.body.uuid,
			});
			if (!user) {
				await User.create({
					mac: req.body.uuid,
					dday: 30,
				});
			}
			req.session.uuid = await req.body.uuid;
			await res.json({ uuid: req.body.uuid });
		} catch (err) {
			console.error(err);
			next(err);
		}
	});
	router.post(`/write`,async(req,res,next)=>{
		try{
			const receive=await User.findAll({
				where:{
					mac:{
			      		[Op.ne]: req.session.uuid,
					},
					dday:{
			      		[Op.ne]:0,
					},
				}
			});
			if(!receive[0]){
				return res.json({success:"no"});
			}
			const idx=Math.floor(Math.random()*receive.length);
			
			await Chat.create({
				userId:req.session.uuid,
				content:req.body.content,
				send:req.session.uuid,
				receive:receive[idx].mac,
				read:1,
			});
			res.json({success:"yes"});
		}catch(err){
			console.error(err);
		}
	});
};