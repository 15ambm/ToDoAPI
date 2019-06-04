

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const expressValidator = require('express-validator');
const ToDo = require('./todo');

const app = express();

app.set('view engine', 'pug'); // express handles loading the pug module itself
app.set('views', './views');

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

// Configuration
console.log(`Application Name: ${config.get('name')}`);

app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan Enabled . .');
}
app.use(express.json());
app.use(expressValidator()); // for input validation, etc.
app.set('json spaces', 2); // Makes json output a little prettier
app.use(express.static('public')); // for static files, readme

app.use((req, res, next) => { // a middleware function
  console.log('logging . . '); // doesnt actually do anything of interest

  next();
});

const aList = new ToDo('AlexsList');

aList.addItem({
  id: '1',
  name: 'item1',
});
aList.addItem({
  id: '2',
  name: 'item2',
});
aList.addItem({
  id: '3',
  name: 'item3',
});
aList.addItem({
  id: '4',
  name: 'item4',
});

// Landing page, welcome message
app.get('/', (req, res) => {
  // res.send('welcome to my TODO api');
  res.render('index', { title: 'ToDoAPI', message: 'Welcome to my ToDo App' });
});

// our full list of ToDos
app.get('/api/list', (req, res) => {
  res.json(aList.getList());
});

app.post('/api/add', (req, res) => {
  // validate our ToDo
  const item = req.body;
  const check = ToDo.isValid(item);

  // If it is valid input, add to our list
  if (check) {
    const newItem = ToDo.packageItem(item);
    aList.addItem(newItem);
    return res.status(201).send('added new item');
  }
  // If invalid input let the user know
  return res.status(400).send('Bad input');
});


app.put('/api/list/:id', (req, res) => {
  const { id } = req.params;

  // confirm the item exists in the list by checking if the id from our endpoint is in the list
  const item = aList.getList().find(c => c.id === id);
  if (!item || item === undefined) return res.status(404).send('Could not find an item with that name');
  // if the update is not valid OR an attempt to change the id is made, send a bad request
  // console.log(req.body);
  dbDebugger(req.body);
  if (ToDo.isValid(req.body) && id === req.body.id) {
    // otherwise update the item and indicate success
    aList.updateItem(req.params.id, req.body);
    return res.status(200).send('item updated');
  }
  return res.status(400).send('Item is not valid');
});


app.delete('/api/list/:id', (req, res) => {
  const { id } = req.params;
  const item = aList.getList().find(c => c.id === id);
  if (!item || item === undefined) return res.status(404).send('Could not find an item with that name');

  const index = aList.getList().indexOf(item);
  aList.getList().splice(index, 1);
  return res.status(200).send(item);
});

dbDebugger('connected to the database');

const port = process.env.port || 3000;
app.listen(port, () => console.log(`TODO API is listening on ${port}`));
