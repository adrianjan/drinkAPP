const express = require('express');

const router = express.Router();

router.get('/drinks', (request, response) => {
  response.send( { type: 'GET' } );
});

router.post('/drinks', (request, response) => {
  console.log(request.body);
  response.send( {
    type: 'POST',
    name: request.body.name,
    water: request.body.water
  } );
});

router.put('/drinks/:id', (request, response) => {
  response.send( { type: 'PUT' } );
});

router.delete('/drinks/:id', (request, response) => {
  response.send( { type: 'DELETE' } );
});

module.exports = router;
