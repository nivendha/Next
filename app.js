var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connectMongo = require('connect-mongo')(session);
var config = require ('./app/config.js');
var mongoose = require('mongoose').connect(config.dbURL);
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy

var app = express();


app.set('port', process.env.PORT || 8077);
app.use(express.static(__dirname + '/app/public'));
app.set('views', __dirname + '/app/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


var environment = process.env.NODE_ENV || 'development';

if(environment=='development'){
  app.use(session({
    secret:config.sessionSecret,
    saveUninitialized:true,
    resave:true
  }));
}else{
  app.use(session({
    secret:config.sessionSecret,
    store: new connectMongo({
      //url:config.dbURL,
      mongoose_connection:mongoose.connections[0],
      stringify:true
    })
  }));
}
app.use(passport.initialize());
app.use(passport.session());

require('./app/passportAuth.js')(passport,FacebookStrategy,mongoose,config);
require('./app/routes')(app,passport);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__lineNumber', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});