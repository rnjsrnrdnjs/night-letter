const expressLoader=require('./express');

module.exports=async (app)=>{
	//db
	const {sequelize} =require('../models');
	  sequelize
        .sync({ force: false })
        .then(() => {
            console.log('database connecting success');
        })
        .catch((err) => {
            console.error(err);
        });
	
	await expressLoader(app);
};

