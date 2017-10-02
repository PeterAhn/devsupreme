var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// Database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_DEVSUPREME, {useMongoClient: true});
var db = mongoose.connection;
db.once('open', function () {
   console.log('DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

// API
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

// Angular
app.use(express.static(path.resolve(__dirname, '../dist'))); //1
app.get('*', function (req, res) { //2
  var indexFile = path.resolve(__dirname,'../dist/index.html');
  res.sendFile(indexFile);
});

// Server
var port = 3000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
