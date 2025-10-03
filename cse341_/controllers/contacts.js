const { ObjectId } = require("mongodb");
const getDb = require("../data/database").getDatabase;

exports.getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.db().collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleContact = async (req, res) => {
  try {
    const db = getDb();
    const contact = await db
      .db()
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const db = getDb();
    const result = await db
      .db()
      .collection("contacts")
      .insertOne({ firstName, lastName, email, favoriteColor, birthday });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const db = getDb();
    const result = await db
      .db()
      .collection("contacts")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { firstName, lastName, email, favoriteColor, birthday } }
      );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Contact not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const result = await db
      .db()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Contact not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
