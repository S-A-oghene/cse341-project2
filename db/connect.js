const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
  } catch (err) {
    console.error('Could not connect to DB', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
