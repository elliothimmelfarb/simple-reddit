'use strict';

const PORT = process.env.PORT || 8000

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.send('ok!')
});

app.listen(PORT, err => {
  console.log(err || 'Server listening on port ${PORT}');
})
