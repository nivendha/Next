var Cookies = require("cookies");
var httprequest = require('request');
var ejs = require('ejs');

// ENDPOINTS for Views:
var RV_LOGIN = '/login',
RV_DASHBOARD = '/my-account';

module.exports = function(app) {
	app.get('/', function(request, response){
	var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.redirect(RV_LOGIN);
		} else {
			response.render('login.html');
		}
	});

	app.get(RV_LOGIN, function(request, response){
		var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.render('login.html');
		} else {
			response.render('login.html');
		}
	});
};