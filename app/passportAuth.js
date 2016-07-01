module.exports = function(passport,FacebookStrategy,mongoose,config){
	
	var userSchema = new mongoose.Schema({
		profileId:String,
		fullname:String,
		proPic:String
	});
	
	var userModel = mongoose.model('userSchema',userSchema);
	
	passport.serializeUser(function (user,done) {
		done(null,user.id);
	});
	
	passport.deserializeUser(function (id,done) {
		userModel.findById(id,function (err,user) {
				done(null,user);
		});
	});
	
	passport.use(new FacebookStrategy({
		clientID:config.fb.appID,
		clientSecret:config.fb.appSecret,
		callbackURL: config.fb.callback,
		profileFields:['id','displayName','photos','about']
	},function (accessToken,refreshToken,profile,done) {
		userModel.findOne({'profileId':profile.id},function (err,result) {
			if(result){
				done(null,result);
			}else{
				
				var newUser= new userModel({
					profileId:profile.id,
					fullname:profile.displayName,
					proPic:profile.photos[0].value || ''
				});
				
				newUser.save(function (err) {
					done(null,newUser);
				})	
			}
		})
	})
	);
}