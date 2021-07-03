const expressLoader=require('./express');
const sequelizeLoader=require('./sequelize');
const cronLoader=require('./cronday');
module.exports=async (app)=>{
	
	await sequelizeLoader();
	await cronLoader();
	await expressLoader(app);
};

