const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
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
      callbackURL: `http://localhost:$${process.env.PORT}/auth/facebook/redirect`,
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

passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          googleId: profile.id,
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
      return done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ email: username }).select("+password");
    if (!user) {
      return done(null, false, { message: "No user found with this email" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Password is incorrect" });
    }
    return done(null, user);
  })
);
