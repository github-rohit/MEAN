var express = require('express');
var mongoose = require('mongoose');

var apiContoller = require('./controllers/apiController');
var config = require('./config');
var server = express();

var port = process.env.PORT || 3000;

server.use('/assets', express.static(__dirname + '/public'));
server.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
apiContoller(server);
server.listen(port);