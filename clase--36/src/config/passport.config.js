const passport = require("passport");
const jwt = require("passport-jwt");


const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}


const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }
    return token;
}

module.exports = initializePassport;