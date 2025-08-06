const { ObjectId } = require('mongodb');
const LibraryUser = require('../models/libraryUserModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await LibraryUser.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }
    const user = await LibraryUser.findById(req.params.id);
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new LibraryUser(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      userId: savedUser._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }
    const updatedUser = await LibraryUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or data is the same' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }
    const deletedUser = await LibraryUser.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};