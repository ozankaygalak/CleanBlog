const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const Photos = require('./models/Photos.js');
var methodOverride = require('method-override');
app.use(express.static('public'));
const fileUpload = require('express-fileupload');
app.use(express.urlencoded({ extended: true })); // urlencoded işlemcisi
app.use(express.json()); // json işlemcisi
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  }),
);
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/clean-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photos.findById(req.params.id);
  res.render('post', { photo });
});

app.get('/', async (req, res) => {
  const photos = await Photos.find({});
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/index', async (req, res) => {
  const photos = await Photos.find({});
  res.render('index', { photos });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/update/:id', async (req, res) => {
  const photo = await Photos.findOne({ _id: req.params.id });
  res.render('update', { photo });
});

app.post('/blogs', async (req, res) => {
  let pathDir = 'public/uploads';
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }
  let uploadImage = req.files.photo;
  let uploadPath = __dirname + '/public/uploads' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photos.create({
      ...req.body,
      photo: '/uploads' + uploadImage.name,
    });
    res.redirect('/');
  });
});

app.put('/blogs/:id', async (req, res) => {
  const bloggg = await Photos.findOne({ _id: req.params.id });
  bloggg.title = req.body.title;
  bloggg.detail = req.body.detail;
  bloggg.save();
  res.redirect(`/photos/${req.params.id}`);
});

app.delete('/photos/:id',async  (req,res) => {

})

const port = 3007;
app.listen(port, () => {
  console.log(`server ${port} çalışıyor`);
});
