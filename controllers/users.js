const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
  try {
    const result = await getDb().collection('users').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection('users').find({ _id: userId });
    const users = await result.toArray();
    if (users.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await getDb().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({
        message: 'User created successfully',
        userId: response.insertedId,
      });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the user.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await getDb().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or data is the same' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await getDb().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
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
