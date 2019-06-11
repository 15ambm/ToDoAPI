

const startupDebugger = require('debug')('app:startup');
const debug = require('debug')('app:db'); // 'app:db' is our namespace, we use this to choose what debug lines to use

process.env.NODE_CONFIG_DIR = './app/config';
const config = require('config');
// const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const expressValidator = require('express-validator');
// const ToDo = require('./todo');
const list = require('./app/routes/list');
const home = require('./app/routes/home');


const app = express();

app.set('view engine', 'pug'); // express handles loading the pug module itself
app.set('views', './views');

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

// Configuration

console.log(`Application Name: ${config.get('name')}`);

// app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan Enabled . .');
}

// our middleware
app.use(express.json());
app.use(expressValidator()); // for input validation, etc.
app.set('json spaces', 2); // Makes json output a little prettier
app.use(express.static('public')); // for static files, readme
app.use('/api/list', list); // our routes
app.use('/', home); // this is for the home page

// app.use((req, res, next) => { // a middleware function we made
//   console.log('logging . . '); // doesnt actually do anything of interest

//   next();
// });

debug('connected to the database');

const port = process.env.port || 3000;
app.listen(port, () => console.log(`TODO API is listening on ${port}`));
