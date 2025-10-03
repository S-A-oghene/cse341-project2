const { ObjectId } = require("mongodb");
const getDb = require("../data/database").getDatabase;

exports.getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.db().collection("users").find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const db = getDb();
    const user = await db
      .db()
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, email, fullName } = req.body;
  try {
    const db = getDb();
    const result = await db
      .db()
      .collection("users")
      .insertOne({ username, email, fullName });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const updateFields = req.body;

    delete updateFields._id;
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    const db = getDb();
    const result = await db
      .db()
      .collection("users")
      .updateOne({ _id: userId }, { $set: updateFields });
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const db = getDb();
    const result = await db
      .db()
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
