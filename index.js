// Require core modules.
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Inherit express properties so it can be used extensively.
const app = express();

// setting static directory where  css, images and side-javascript codes are going to be kept 
app.use(express.static(__dirname + '/public'));

// connect to mongodb
mongoose.connect('mongodb://localhost/abdul', {
  useMongoClient: true
});

const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require routes ( for routing our app )
const routes = require('./routes/router');

// Implementing our template engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Setting our app to make use of our defined routes (routes/router.js)
app.use('/', routes);

// start the app on port 8000 and listen to incoming requests.
app.listen(8000, function () {
    console.log('Express app listening on port 8000');
  });
