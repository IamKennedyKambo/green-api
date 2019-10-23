require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const ngrok = require('ngrok');
const user = process.env.USER;
const password = process.env.PASSWORD;

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'greensmart'
});

mc.connect();

app.get('/', (req, res) => {
  res.send('This is the tunnel created by Ngrok with Http Auth');
});

ngrok.connect(
  {
    proto: 'http',
    addr: process.env.PORT,
    auth: `${user}:${password}`
  },
  (err, url) => {
    if (err) {
      console.error('Error while connecting Ngrok', err);
      return new Error('Ngrok Failed');
    } else {
      console.log('Tunnel Created -> ', url);
      console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
    }
  }
);

const server = app.listen(process.env.PORT, () => {
  console.log('Express listening at ', server.address().port);
});

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route
