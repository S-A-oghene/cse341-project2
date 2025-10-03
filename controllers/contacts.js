const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await getDb().collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single contact
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    const userId = new ObjectId(req.params.id);
    const result = await getDb()
      .collection("contacts")
      .findOne({ _id: userId });

    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create) a new contact
const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const result = await getDb()
      .collection("contacts")
      .insertOne({ firstName, lastName, email, favoriteColor, birthday });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update) a contact
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    const contactId = new ObjectId(req.params.id);
    const updateFields = req.body;
    delete updateFields._id;

    const result = await getDb()
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a contact
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    const result = await getDb()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
