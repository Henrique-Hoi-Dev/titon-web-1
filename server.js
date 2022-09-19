const express = require('express')
const { resolve } = require('path')

const app = express()

app.use('/', express.static(resolve(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/driver", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/login", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/home", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, (err) => {
  if (err) { return console.log(err) }

  console.log("server run web!!")
})
