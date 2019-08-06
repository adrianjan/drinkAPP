const express = require('express');
const Drink = require('../models/Drink');

const router = express.Router();

router.get('/drinks', (request, response, next) => {
  response.send( { type: 'GET' } );
});

router.post('/drinks', (request, response, next) => {
  Drink.create(request.body).then( (drink) => {
    response.send(drink);
  } ).catch(next);
});

router.put('/drinks/:id', (request, response, next) => {
  response.send( { type: 'PUT' } );
});

router.delete('/drinks/:id', (request, response, next) => {
  response.send( { type: 'DELETE' } );
});

module.exports = router;
