var Cookies = require("cookies");
var httprequest = require('request');
var path    = require("path");
//var ejs = require('ejs');

var launchApp='admin_lite';

/*temporary data*/
var node0_md={
	data:'junk data for temporary usage'
};


// ENDPOINTS for Views:
var NX_APP_MAIN = '/',
NX_APP_LOGIN= '/login',
NX_NODE_DATA= '/nodeData',
NX_TEMPLATE = '/template',
NX_TEMPLATE_CSS = '/templateCss',
NX_AUTH_FB='/auth/fb',
NX_AUTH_FB_CALLBACK='/auth/fb/callback',
NX_SET_FBUSER= '/setFbUser',
NX_GET_FBUSER='/getFbuser';

module.exports = function(app,passport) {
	
	app.get(NX_APP_LOGIN, function(request, response){
	var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.redirect('');
		} else {
			response.render('login.html');
		}
	});
	
	app.get(NX_AUTH_FB,passport.authenticate('facebook'));

	app.get(NX_AUTH_FB_CALLBACK,passport.authenticate('facebook',{
		successRedirect:NX_SET_FBUSER,
		failureRedirect:NX_APP_LOGIN
	}));

	app.get(NX_SET_FBUSER, function(request, response){
		if(request.user!=undefined){
			request.session.fbuser=request.user;
			console.log('session set in nx for fbuser :'+request.session.fbuser);
			response.redirect(NX_APP_MAIN);	
		}else{
			response.send('invalid data');
		}
	});
	
	app.get(NX_GET_FBUSER, function(request, response){
				response.send(request.session.fbuser || 'none loged in');
	});
	
	app.get(NX_APP_MAIN, function(request, response){
	var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.redirect(NX_APP_MAIN);
		} else {
			response.render('main.html');
		}
	});

	

	app.get(NX_NODE_DATA, function(request, response){
	var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.send(node0_md);
		} else {
			response.send(node0_md);
		}
	});

	app.get(NX_TEMPLATE, function(request, response){
		var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.render(request.query.tmplId+'.nxt');
		} else {
			var tmpltSrc=request.query.tmplId+'.nxt';
			 response.sendFile(path.join(__dirname+'/src/'+launchApp+'/custom_templates/'+tmpltSrc));
		}
	});

};