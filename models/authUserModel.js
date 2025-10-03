const { getDb } = require("../db/connect");

const findOrCreate = async (profile) => {
  const db = getDb();
  const usersCollection = db.collection("users");

  // Try to find the user by their GitHub ID
  let user = await usersCollection.findOne({ githubId: profile.id });

  if (!user) {
    // If user doesn't exist, create a new one
    const newUser = {
      githubId: profile.id,
      username: profile.username,
      fullName: profile.displayName,
      // You can add more fields from the profile object if needed
    };
    const result = await usersCollection.insertOne(newUser);
    user = { _id: result.insertedId, ...newUser };
  }

  return user;
};

module.exports = { findOrCreate };
