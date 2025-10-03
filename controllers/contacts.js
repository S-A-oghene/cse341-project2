const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const result = await getDb().collection("contacts").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single contact
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact ID format." });
    }
    const userId = new ObjectId(req.params.id);
    const result = await getDb()
      .collection("contacts")
      .findOne({ _id: userId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle };
