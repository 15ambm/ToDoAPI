/* eslint-disable no-plusplus */
/* eslint-disable radix */


const express = require('express');
const expressValidator = require('express-validator');
const ToDo = require('./todo');

const app = express();
app.use(express.json());
app.use(expressValidator());
app.set('json spaces', 2);

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
  res.send('welcome to my TODO api');
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
    console.log('added a new item');
    res.send('added new item');
  } else {
    // If invalid input let the user know
    res.status(400).send('Bad input');
  }
});


app.put('/api/list/:id', (req, res) => {
  const { id } = req.params;

  // confirm the item exists in the list by checking if the id from our endpoint is in the list
  const item = aList.getList().find(c => c.id === id);
  if (!item || item === undefined) res.status(404).send('Could not find an item with that name');
  // if the update is not valid OR an attempt to change the id is made, send a bad request
  console.log(req.body);
  if (ToDo.isValid(req.body) && id === req.body.id) {
    // otherwise update the item and indicate success
    aList.updateItem(req.params.id, req.body);
    res.status(200).send('item updated');
  } else {
    res.status(400).send('Item is not valid');
  }
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`TODO API is listening on ${port}`));
