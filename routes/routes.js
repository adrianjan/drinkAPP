const express = require('express');

const router = express.Router();

router.get('/drinks', (request, response) => {
  response.send( { type: 'GET' } );
});

router.post('/drinks', (request, response) => {
  response.send( { type: 'POST' } );
});

router.put('/drinks/:id', (request, response) => {
  response.send( { type: 'PUT' } );
});

router.delete('/drinks/:id', (request, response) => {
  response.send( { type: 'DELETE' } );
});

module.exports = router;
