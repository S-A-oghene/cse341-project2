const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

const getAllUsers = async (req, res) => {
  try {
    const users = await getDb().collection("users").find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const {
    username,
    email,
    fullName,
    firstName,
    lastName,
    favoriteColor,
    birthday,
  } = req.body;
  try {
    const result = await getDb().collection("users").insertOne({
      username,
      email,
      fullName,
      firstName,
      lastName,
      favoriteColor,
      birthday,
    });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const updateFields = req.body;
    delete updateFields._id;

    const result = await getDb()
      .collection("users")
      .updateOne({ _id: userId }, { $set: updateFields });

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const result = await getDb()
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
