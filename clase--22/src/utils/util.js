const passport = require("passport");

const passportCall = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if(error) {
                return next(error);
            }
            if(!user) {
                res.status(401).send({error: info.message ? info.message : info.toString()});
            }

            req.user = user; 
            next();
        })(req, res, next)
    }
}


const authorization = (role) => {
    return async (req, res, next) => {
        if(req.user.role !== role) {
            return res.status(403).send({message: "No tenes permisooo amiguitooo"});
        }
        next();
    }
}

module.exports = {
    passportCall,
    authorization
}