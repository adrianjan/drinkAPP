const express = require('express');
const Drink = require('../models/Drink');

const router = express.Router();

// get data
router.get('/drinks', (request, response, next) => {
  Drink.find({}).then((drinks) => {
    response.send(drinks);
  });
});

// create record
router.post('/drinks', (request, response, next) => {
  Drink.create(request.body).then((drink) => {
    response.send(drink);
  }).catch(next);
});

//update record
router.put('/drinks/:id', (request, response, next) => {
  Drink.findByIdAndUpdate({
    _id: request.params.id
  }, request.body).then((drink) => {
    Drink.findOne({
      _id: request.params.id
    }).then((drink) => {
      response.send(drink);
    })
  })
});

// delete record
router.delete('/drinks/:id', (request, response, next) => {
  Drink.findOneAndRemove({
    _id: request.params.id
  }).then((json) => {
    response.send(json);
  })
});

module.exports = router;
