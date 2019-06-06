const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  // res.send('welcome to my TODO api');
  res.render('index', { title: 'ToDoAPI', message: 'Welcome to my ToDo App' });
});

module.exports = router;
