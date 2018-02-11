// author      : Kaden Griffith
// filename    : server.js

// Live Port
const port = 5000;

// Example Dependencies
const express = require('express'),
  app = express(),
  hypertxt_templates = require('./kbrew_hypertxt_templates.js'),
  hypertxt = new hypertxt_templates();

app.set('port', port);
app.use(express.static('./public/'));

// Http request handler
app.get('/', (req, res) => {
  res.send(hypertxt.index({
    body: hypertxt.liveExample()
  }));
});

// App reports when listening
app.listen(port, () => {
  console.log('This demo is listening on localhost:' + port);
});