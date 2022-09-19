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
app.get("/dashboard", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/perfil/:id", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/adress/:id", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/caixa/:id", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/listProducts", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});
app.get("/listServico", function(req, res){
  res.sendFile(resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, (err) => {
  if (err) { return console.log(err) }

  console.log("server run web!!")
})
