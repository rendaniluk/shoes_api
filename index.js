const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const ShoesApiRoutes = require('./shoes');

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

app.get('/', function(req, res) {
  res.redirect('/api/shoes')
});

//setting up routes
app.get('/api/shoes', shoe_apiRoutes.shoes);
app.get('/api/shoes/add', shoe_apiRoutes.index);
app.get('/api/shoes/brand/:brandname', shoe_apiRoutes.brands);
app.get('/api/shoes/size/:sizes', shoe_apiRoutes.sizes);
app.get('/api/shoes/brand/:brandname/size/:sizes', shoe_apiRoutes.sizesBrands);
// app.post('/api/shoes/sold/:id', shoe_apiRoutes.sale);
app.post('/api/shoes/add', shoe_apiRoutes.dbUpdates);

app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
