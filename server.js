const express = require('express');
const { resolve } = require('path');

const app = express();

app.use('/', express.static(resolve(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/driver', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/home', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/user', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/truck', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/cart', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/report', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/check', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/historic', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/info-financial/:id', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/forgot-password', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/driver/forgot-password', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get('/driver/forgot-password-success', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server run web!!', process.env.PORT);
});
