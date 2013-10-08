
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var goods = require('./routes/goods');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env'))
{
    app.use(express.errorHandler());
}


// Create/load the datastore and make it accessible from anywhere:
var Datastore = require('nedb');
app.set('db', new Datastore({ filename: 'goods.dat', autoload: true }));


app.get('/', routes.index);
app.get('/goods/', goods.watched);
app.get('/goods/:item_id/details', goods.details);
app.get('/goods/add', goods.add);
app.post('/goods/new', goods.new);

http.createServer(app).listen(app.get('port'), function()
{
    console.log('Express server listening on port ' + app.get('port'));
});

