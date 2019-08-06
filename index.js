const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.listen(1000, () => {
  console.log('Listening on port 1000');
});

app.use('/api', routes);
