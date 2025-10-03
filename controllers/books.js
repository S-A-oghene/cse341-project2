const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

const getAllBooks = async (req, res) => {
  try {
    const books = await getDb().collection("books").find().toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await getDb()
      .collection("books")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  const {
    title,
    author,
    publicationYear,
    isbn,
    genre,
    pages,
    summary,
    language,
  } = req.body;
  try {
    const result = await getDb().collection("books").insertOne({
      title,
      author,
      publicationYear,
      isbn,
      genre,
      pages,
      summary,
      language,
    });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const bookId = new ObjectId(req.params.id);
    const updateFields = req.body;
    delete updateFields._id;

    // Prevent empty updates
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    const result = await getDb()
      .collection("books")
      .updateOne({ _id: bookId }, { $set: updateFields });

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Book not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const result = await getDb()
      .collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Book not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
