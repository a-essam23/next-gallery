const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/redirect`,
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ facebookId: profile.id });
      if (user) {
        return done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          facebookId: profile.id,
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENTID,
//       clientSecret: process.env.GOOGLE_CLIENTSECRET,
//       callbackURL: `http://localhost:${process.env.PORT}/auth/google/redirect`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const user = await User.findOne({
//         googleId: profile.id,
//       });
//       if (!user) {
//         const newUser = new User({
//           name: profile.displayName,
//           googleId: profile.id,
//           email: profile.email,
//         });
//         const savedUser = await newUser.save();
//         return done(null, savedUser);
//       }
//       return done(null, user);
//     }
//   )
// );

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ user: username }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    }).select("+password");
  })
);
