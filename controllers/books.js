const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllBooks = async (req, res) => {
  try {
    const result = await getDb().collection('books').find();
    const books = await result.toArray();
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
    const bookId = new ObjectId(req.params.id);
    const book = await getDb().collection('books').findOne({ _id: bookId });
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
    const book = {
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
      genre: req.body.genre,
      isbn: req.body.isbn,
      pages: req.body.pages,
      summary: req.body.summary,
      language: req.body.language,
    };
    const response = await getDb().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json({
        message: 'Book created successfully',
        bookId: response.insertedId,
      });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the book.' });
    }
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
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
      genre: req.body.genre,
      isbn: req.body.isbn,
      pages: req.body.pages,
      summary: req.body.summary,
      language: req.body.language,
    };
    const response = await getDb().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
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
    const bookId = new ObjectId(req.params.id);
    const response = await getDb().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
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
