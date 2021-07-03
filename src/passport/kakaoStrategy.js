const passport=require('passport');
const KakaoStrategy=require('passport-kakao').Strategy;

const User=require('../models/user');

module.exports=()=>{
	passport.use(new KakaoStrategy({
		clientID:process.env.KAKAO_ID,
		callbackURL:'/auth/kakao/callback',
	},async(accessToken,refreshToken,profile,done)=>{
		console.log('kakao profile',profile);
		try{
			const exUser=await User.findOne({
				where:{mac:profile.id},
			});
			if(exUser){
				done(null,exUser);
			}else{
				const newUser=await User.create({
					mac:profile.id,
					dday:30,
				});
				done(null,newUser);
			}
		}catch(err){
			console.error(err);
			done(err);
		}
	}));
};