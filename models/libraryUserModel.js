const mongoose = require('mongoose');

const libraryUserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String },
  birthday: { type: String } // Storing as string to match Swagger example '1990-01-15'
});

module.exports = mongoose.model('LibraryUser', libraryUserSchema, 'users');