import passport from "passport";
import local from "passport-local";

import UserModel from "../models/user.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        //Le digo que quiero acceder al objeto request
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;

        try {
            //Verificamos si ya existe un registro con ese email
            let user = await UserModel.findOne({ email });
            if (user) return done(null, false);

            //Si no existe, lo voy a crear 

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))

    //Estrategia de Login: 

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Primero verificamos si existe un usuario con ese email
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log("Este usuario no existe, quien te conoce papá");
                return done(null, false);
            }
            //Si existe verifico la contraseña
            if (!isValidPassword(password, user)) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))

    //Proceso de serialización: se encarga de convertir el objeto de usuario en una cadena que se puede almacenar en la sesión. 

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser( async (id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user);
    })
}