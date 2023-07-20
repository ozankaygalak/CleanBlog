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
console.log(BlogSchema.title);
console.log(BlogSchema.detail);
const Photos = mongoose.model('Photos', BlogSchema);

module.exports = Photos;
