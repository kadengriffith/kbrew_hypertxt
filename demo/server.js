// author   : Kaden Griffith
// filename : server.js

// Live Port
const port = 5000;

// Example Dependencies
const express = require('express'),
  app = express(),
  Templates = require('./Templates')();

// Http request handler
app.get('/', (req, res) => {
  res.send(Templates.index({
    body: Templates.example()
  }));
});

// App reports when listening
app.listen(port, () => {
  console.log('This demo is listening on localhost:' + port);
});