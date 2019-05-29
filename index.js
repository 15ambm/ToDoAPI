

const express = require('express');
const expressValidator = require('express-validator');
const ToDo = require('./todo');

const app = express();
app.use(express.json());
app.use(expressValidator());

const aList = new ToDo('AlexsList');

aList.addItem({
  id: '1',
  name: 'item1',
  description: 'Description . . ',
  tags: ['high priority'],
  status: true,
});
aList.addItem({
  id: '2',
  name: 'item2',
  description: 'This is my second list item',
  tags: ['low priority', 'chores'],
  status: true,
});

// Landing page, welcome message
app.get('/', (req, res) => {
  res.send('welcome to my TODO api');
});

// our full list of ToDos
app.get('/api/list', (req, res) => {
  res.send(aList.getList());
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
  // confirm the item exists in the list
  const item = aList.getList().find(c => c.id === req.params.id);
  if (!item) res.status(404).send('Could not find an item with that name');

  if (ToDo.isValid(req.body)) {
    aList.updateItem(req.params.id, req.body);
    res.send('Update completed');
  } else {
    console.log('Bad update');
    res.status(400).send('Bad update');
  }
});


const port = process.env.port || 3000;
app.listen(port, () => console.log(`TODO API is listening on ${port}`));
