

const express = require('express');
const ToDo = require('../controllers/todo');

const router = express.Router();
const logger = require('../logger/logger');

const aList = new ToDo('AlexsList');

aList.addItem({
  id: 1,
  name: 'item1',
});
aList.addItem({
  id: 2,
  name: 'item2',
});
aList.addItem({
  id: 3,
  name: 'item3',
});
aList.addItem({
  id: 4,
  name: 'item4',
});

// our full list of ToDos
router.get('/', (req, res) => {
  logger.log('info', '/api/list GET Request', aList.getList());
  res.json(aList.getList());
});

router.post('/', (req, res) => {
  // validate our ToDo
  const item = req.body;
  const check = ToDo.isValid(item);

  // If it is valid input, add to our list
  if (check) {
    const newItem = aList.packageItem(item);
    aList.addItem(newItem);
    logger.log('info', '/api/list POST Request', newItem);
    return res.status(201).send('new item added');
  }
  // If invalid input let the user know
  logger.log('warn', '/api/list POST Request Unable to post invalid item');
  return res.status(400).send('Bad input');
});


router.put('/:id', (req, res) => {
  // const { id } = req.params;
  const id = parseInt(req.params.id, 10);

  // confirm the item exists in the list by checking if the id from our endpoint is in the list
  const item = aList.getList().find(c => c.id === id);
  if (!item || item === undefined) {
    logger.log('warn', '/api/list PUT Could not find an item with that name');
    return res.status(404).send('Could not find an item with that name');
  }
  // if the update is not valid OR an attempt to change the id is made, send a bad request

  if (ToDo.isValid(req.body)) {
    // otherwise update the item and indicate success
    console.log(typeof req.params.id);
    aList.updateItem(id, req.body);
    logger.log('info', '/api/list PUT Request', req.body);
    return res.status(200).send('item updated');
  }
  logger.log('warn', '/api/list PUT Item is not valid');
  return res.status(400).send('Item is not valid');
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = aList.getList().find(c => c.id === id);
  if (!item || item === undefined) {
    logger.log('warn', '/api/list DELETE Could not find an item with that name');
    return res.status(404).send('Could not find an item with that name');
  }

  const index = aList.getList().indexOf(item);
  aList.getList().splice(index, 1);
  logger.log('info', '/api/list DELETE Request', item);

  aList.updateIDs(id);
  return res.status(200).send(item);
});

module.exports = router;
