const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

app.listen(1000, () => {
  console.log('Listening on port 1000');
});

// get data from request.body
app.use(bodyParser.json());

app.use('/api', routes);
