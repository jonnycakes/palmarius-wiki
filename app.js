// Requires
require('dotenv').config(); // use the .env file for configuration locally
const express        = require('express'); //express framework
const logger         = require('morgan'); // logging functionality
const path           = require('path'); // https://nodejs.org/api/path.html#path_path
const bodyParser     = require('body-parser'); // middleware that grabs data (like form inputs) from body
const methodOverride = require('method-override'); // override html verbs
// const marked         = require('marked'); // markup support

// PORT
const PORT = process.argv[2] || process.env.PORT || 3000;

// Starters
const app = express(); // Start express
app.use(logger('dev')); // start morgan

// some stuff for static assets
const dir = {
  public: path.join(__dirname, 'public'),
  jquery: path.join(__dirname, 'node_modules/jquery/dist'),
  materialize: path.join(__dirname, 'node_modules/materialize-css/dist'),
};

// set up static middleware for public folders
app.use(express.static(dir.public));
app.use('/vendor/jquery', express.static(dir.jquery));
app.use('/vendor/materialize', express.static(dir.materialize));

// set up node to use ejs as templating engine
// I MAY CHANGE THIS TO PUG!
app.set('view engine', 'ejs');

// Set up moments. h/t Arun and https://gist.github.com/ibriq/82b204d316067803e796
app.locals.moment = require('moment');

// Set up body parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up method override to allow HTML forms to perform PUT and DELETE requests
app.use(methodOverride('_method'));

// Testing marked
app.locals.marked = require('marked')
// console.log(marked('I am using __markdown__.'));

// Routes
app.use('/', require('./controllers'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack, next);
  return res.sendStatus(400);
});

// listener envocation
app.listen(PORT, () => console.log(`Listening! Current port is: ${PORT}`));
