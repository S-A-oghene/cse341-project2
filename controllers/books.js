const { ObjectId } = require('mongodb');
const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    console.error(err); // Log the full error for debugging
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getSingleBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID format.' });
    }
    const book = await Book.findById(req.params.id);
    if (book) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json({
      message: 'Book created successfully',
      bookId: savedBook._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID format.' });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBook) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or data is the same' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID format.' });
    }
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
