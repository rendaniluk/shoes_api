const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const ShoesApiRoutes = require('./shoes');
const logger = require('morgan')

const mongoURL = process.env.MONGO_DB_URL ||
  'mongodb://localhost/shoes_api_dbs';

const Models = require('./models');

const models = Models(mongoURL);

const shoe_apiRoutes = ShoesApiRoutes(models);

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  },
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "PUT,POST,DELETE");
    return res.status(200).json({})
  }
  next();
});

app.get('/favicon.ico', function(req, res) {
  // res.send('./favicon.ico')
})

app.get('/', function(req, res) {
  res.redirect('/api/shoes')
});

//setting up routes
//GET routes
app.get('/api/shoes', shoe_apiRoutes.allShoes);
app.get('/api/shoes/brand/:brandname', shoe_apiRoutes.brandsFilter);
app.get('/api/shoes/sizebrandsdropdowns', shoe_apiRoutes.sizesBrandsDropDowns);
app.get('/api/shoes/size/:sizes', shoe_apiRoutes.sizesFilter);
app.get('/api/shoes/brand/:brandname/size/:sizes', shoe_apiRoutes.sizesBrandsFilter);

//POST routes
app.post('/api/shoes/', shoe_apiRoutes.stockAdd);
app.post('/api/shoes/sold/:id/qty/:qID', shoe_apiRoutes.purchase);
app.post('/api/shoes/stockadd/:id/qty/:qID', shoe_apiRoutes.updateInstock);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next) {
  // console.error(err.stack);
  res.status(err.status || 500);
  res.json({
    error: {
      Status: err.status,
      message: err.message
    }
  });
  // .send(err.stack)
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
