const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let _db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    _db = client.db(); // You can specify a database name here if needed, e.g., client.db("yourDbName")
    console.log("Connected to DB");
  } catch (err) {
    console.error("Could not connect to DB", err);
    process.exit(1); // Exit process with failure
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
};

module.exports = { connectDB, getDb };
