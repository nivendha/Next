var Cookies = require("cookies");
var httprequest = require('request');
var path    = require("path");
//var ejs = require('ejs');

var launchApp='proper_cloth';

/*temporary data*/
var node0_md={
	'title':'Proper cloths',
	'tabs':[
		{name:'home'},
		{name:'men'},
		{name:'women'},
		{name:'children'},
		{
		name:'spl',
		child:[
			{childName:'child_1'},{childName:'child_2'},{childName:'child_3'}
			]
		}
	],
	'navBar':{
		'aboutHdr':'About us',
		'aboutMsg':'Get to know us from this description of footer'
	}
};


// ENDPOINTS for Views:
var RV_APP_MAIN = '/index',
RV_NODE_DATA= '/nodeData',
RV_TEMPLATE = '/template';

module.exports = function(app) {
	app.get('/', function(request, response){
	var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.redirect(RV_APP_MAIN);
		} else {
			response.render(RV_APP_MAIN);
		}
	});

	app.get(RV_NODE_DATA, function(request, response){
	var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.send(node0_md);
		} else {
			response.send(node0_md);
		}
	});

	app.get(RV_TEMPLATE, function(request, response){
		var cookies = new Cookies(request, response);
		if (cookies.get('uuid') && cookies.get('token')) {
			response.render(request.query.tmplId+'.nxt');
		} else {
			var tmpltSrc=request.query.tmplId+'.nxt';
			 response.sendFile(path.join(__dirname+'/src/'+launchApp+'/custom_templates/'+tmpltSrc));
		}
	});
};