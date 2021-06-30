const macaddress=require('node-macaddress');

module.exports.checkMac=async()=>{
	let mac=await JSON.stringify( macaddress.networkInterfaces(),null,5);
	console.log(mac);
};




