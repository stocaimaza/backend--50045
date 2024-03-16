const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("../models/user.js");

const initilizePassport = () => {
    passport.use(new FacebookStrategy({
        clientID: 1403396440303650,
        clientSecret: "90b6a3bde0b13665cd2bac895f848b2c",
        callbackURL: "http://localhost:8080/auth/facebook/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        const user = await UserModel.findOne({
            accountId: profile.id,
            provider: "Facebook"
        });

        if (!user) {
            console.log("Agregando un usuario a la BD");
            const newUser = new UserModel({
                first_name: profile.displayName,
                accountId: profile.id,
                provider: "Facebook"
            });
            await newUser.save();
            return done(null, profile);
        } else {
            console.log("El usuario ya existe en nuestra bd");
            return done(null, profile);
        }
    }))

    //Serializar y deserializar al usuario
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}

module.exports = initilizePassport; 