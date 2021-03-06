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
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  // Set to true if you need the website to include cookies in  requests
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Check if preflight request
  if (req.method === 'OPTIONS') {
      res.status(200);
      res.end();
  }
  else {
      // Pass to next layer of middleware
      next();
  }
  // next();
});

// API
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/posts', require('./api/posts'));

// Angular
app.use(express.static(path.resolve(__dirname, '../dist'))); //1
app.get('*', function (req, res) { //2
  var indexFile = path.resolve(__dirname,'../dist/index.html');
  res.sendFile(indexFile);
});

// Server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
