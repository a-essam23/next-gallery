const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports.googleRegister = (passport) => {
    passport.use(
        "google-register",
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${process.env.HOST}/auth/google/register/callback`,
                passReqToCallback: true,
            },
            async (request, accessToken, refreshToken, profile, done) => {
                return await registerUserGoogle(
                    request,
                    accessToken,
                    refreshToken,
                    profile,
                    done
                );
            }
        )
    );
};

module.exports.googleLogin = (passport) => {
    passport.use(
        "google-login",
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${process.env.HOST}/auth/google/login/callback`,
                passReqToCallback: true,
            },
            async (request, accessToken, refreshToken, profile, done) => {
                return await loginUserGoogle(
                    request,
                    accessToken,
                    refreshToken,
                    profile,
                    done
                );
            }
        )
    );
};

module.exports.facebookRegister = (passport) => {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env["FACEBOOK_APP_ID"],
                clientSecret: process.env["FACEBOOK_APP_SECRET"],
                callbackURL: `${process.env.HOST}/oauth2/redirect/facebook`,
            }
            //   function(accessToken, refreshToken, profile, cb) {
            //     db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            //       'https://www.facebook.com',
            //       profile.id
            //     ], function(err, cred) {
            //       if (err) { return cb(err); }
            //       if (!cred) {
            //         // The Facebook account has not logged in to this app before.  Create a
            //         // new user record and link it to the Facebook account.
            //         db.run('INSERT INTO users (name) VALUES (?)', [
            //           profile.displayName
            //         ], function(err) {
            //           if (err) { return cb(err); }

            //           var id = this.lastID;
            //           db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            //             id,
            //             'https://www.facebook.com',
            //             profile.id
            //           ], function(err) {
            //             if (err) { return cb(err); }
            //             var user = {
            //               id: id.toString(),
            //               name: profile.displayName
            //             };
            //             return cb(null, user);
            //           });
            //         });
            //       } else {
            //         // The Facebook account has previously logged in to the app.  Get the
            //         // user record linked to the Facebook account and log the user in.
            //         db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
            //           if (err) { return cb(err); }
            //           if (!user) { return cb(null, false); }
            //           return cb(null, user);
            //         });
            //       }
            //     };
            //   }
        )
    );
};
