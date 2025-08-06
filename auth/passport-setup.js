const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel'); // We will create this model next

passport.serializeUser((user, done) => {
  // The user.id here is the MongoDB document _id
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.APP_BASE_URL}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      // This function is called after the user authorizes your app on GitHub
      try {
        // Check if user already exists in your DB
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          // If user exists, return the user
          return done(null, user);
       } else {
          // If not, create a new user in your DB for authentication purposes
         const newUser = new User({
           githubId: profile.id,
           username: profile.username,
           displayName: profile.displayName,
           email: profile.emails ? profile.emails[0].value : null
         });
         await newUser.save();
         return done(null, newUser);
       }
     } catch (err) {
       return done(err, null);
     }
   }
 )
);

