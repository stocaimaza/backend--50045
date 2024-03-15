//Importamos passport y la estrategia passport-jwt
const passport = require("passport");
const jwt = require("passport-jwt");
//Guarda acá cuando estan importando!

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
        //Misma palabra que tenemos en la App.js! No se olviden! 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}

//Creamos el cookie extractor

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }
    return token;
}

module.exports = initializePassport;