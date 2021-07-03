const express = require('express');
const router = express.Router();
const { User,Chat } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 
const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const passport=require('passport');

module.exports = (app) => {
	app.use('/', router);
	router.use((req, res, next) => {
		res.locals.user=req.user;
		/* res.locals 값추가 가능*/
		next();
	});

	router.get('/',isNotLoggedIn ,async (req, res, next) => {
		try {
			res.render('load');
		} catch (err) {
			console.error(err);
		}
	});
	router.get('/main',isLoggedIn, async (req, res, next) => {
		try {
			//읽지 않은 편지 있는지 만 파악
			await User.update({
				dday:30,
			},{
				where:{
					mac:req.user.mac,
				},
			});
			
			const chats=await Chat.findAll({
				where:{
					receive: req.user.mac
					//[Op.or]: [{send: req.params.uuid}, {receive: req.params.uuid}],
				},
			});
			let readTOF=false;
			for(let i in chats){
				if(chats[i].read==1){
					readTOF=await true;
				}
			}
			const send=await Chat.findAll({
				where:{
					send: req.user.mac
				},
				order: [['createdAt', 'DESC']],
			});
			const receive=await Chat.findAll({
				where:{
					receive: req.user.mac
				},
				order: [['createdAt', 'DESC']],
			});
			res.render('main',{
				read:readTOF,
				send:send,
				receive:receive,
			});
		} catch (err) {
			console.error(err);
		}
	});
	
	router.get('/logout',isLoggedIn,(req,res)=>{
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});
	router.get('/kakao',passport.authenticate('kakao'));
	router.get('/auth/kakao/callback',passport.authenticate('kakao',{
		failureRedirect:'/',
	}),(req,res)=>{
		res.redirect('/');
	});
	
};