const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  isbn: { type: String, required: true },
  genre: { type: String },
  pages: { type: Number },
  summary: { type: String },
  language: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);