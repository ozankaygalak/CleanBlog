const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  detail: String,
  photo: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photos = mongoose.model('Photos', BlogSchema);

module.exports = Photos;
