const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.listen(1000, () => {
  console.log('Listening on port 1000');
});

app.use(cors());

// use public folder to serve static files
//
// app.use(express.static('public'));

// get data from request.body
app.use(bodyParser.json());

app.use('/api', routes);

//errors handle

app.use((error, request, response, next) => {
  response.status(422).send({
    error: error.errors.type.message
  });
});

// connecting to mongoDB
mongoose.connect('mongodb://localhost/drinks', {
  useNewUrlParser: true
});
