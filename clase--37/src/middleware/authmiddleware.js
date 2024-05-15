const passport = require('passport');

function authMiddleware(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.user = null;
        } else {
            req.user = user;
        }
        next();
    })(req, res, next);
}


module.exports = authMiddleware;
