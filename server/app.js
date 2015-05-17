var express = require('express');
var routes = require('./routes');
var http = require('http');
var api = require('./routes/api');
var cons = require('consolidate');
var fs = require("fs");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect        = require('connect');
var methodOverride = require('method-override');

var app = module.exports = express();



// Configuration

    app.set("views", __dirname + '/public/html');
    app.set('view engine', 'html');
    app.engine("html", cons.underscore);
    app.use(cookieParser());
	app.use(bodyParser.json({
        keepExtensions: true,
        limit: 10000000, // 10M bytes limit
        defer: true
    }));
	
    
    app.use(methodOverride('_method'))
	app.use('/',express.static('../public'+'/'));
    app.use(function noCachePlease(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        next();
    });

    


app.use('/',express.static('../public'+'/'));

app.get('/users',api.getUsers);

app.get('/menus',routes.getMenus);


app.listen(8000,function(){
    console.log('Server listening on http://localhost:8000');

});