const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Photos = require('./models/Photos')
const mongoose = require('mongoose');
app.use(express.static('public'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/clean-blog',{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

app.get('/', async (req, res) => {
  const blogs = Photos.find({});
  await res.render('index',{blogs});
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

const port = 3000;
app.listen(port, () => {
  console.log(`server ${port} çalışıyor`);
});
