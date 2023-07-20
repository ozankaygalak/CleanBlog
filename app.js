const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const Photos = require('./models/Photos');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // urlencoded işlemcisi
app.use(express.json()); // json işlemcisi
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/clean-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', async (req, res) => {
  const blogs = await Photos.find({});
  res.render('index',{blogs});
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/index', async (req, res) => {
  const bloger = await Photos.find({});
  res.render('index',{bloger});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/blogs',async (req,res)=>{
  await Photos.create(req.body);
  res.redirect('/index')
});

const port = 3004;
app.listen(port, () => {
  console.log(`server ${port} çalışıyor`);
});
