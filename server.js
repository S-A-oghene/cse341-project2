const express = require("express");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const cors = require("cors"); // Add this line
const { initDb } = require("./db/connect"); // Correctly destructure initDb

// This line executes the passport configuration
require("./auth/passport-setup");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(cors()) // Use cors middleware
  .use(express.json()) // Use built-in JSON parser instead of body-parser
  // 1. Session Middleware - This must come before any routes that use authentication
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions",
        ttl: 14 * 24 * 60 * 60, // 14 days
        autoRemove: "native",
      }),
    })
  )
  // 2. Passport Middleware
  .use(passport.initialize())
  .use(passport.session())
  .use("/", require("./routes")); // Your routes middleware

// Global error handler - must be last middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
