const {CronJob} = require('cron');
const timezone = 'Asia/Seoul';
const {Chat}=require('../models');


module.exports =async() => {
	
	async function cmd() {
		await Chat.decrement({ dday: 1 });
		console.log("dday -1 success");
	}
	
	const cronfn = new CronJob('0 0 23 * * *',cmd,null,false,timezone);
	cronfn.start(); // 크론 실행
	
};
