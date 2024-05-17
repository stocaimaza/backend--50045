const passport = require('passport');

// function authMiddleware(req, res, next) {
//     passport.authenticate('jwt', { session: false }, (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             req.user = null;
//         } else {
//             req.user = user;
//         }
//         next();
//     })(req, res, next);
// }

function authMiddleware(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        // Agregar información de autenticación al objeto res.locals
        res.locals.isAuthenticated = !!user;
        // Pasar el usuario autenticado al objeto req para que esté disponible en los controladores
        req.user = user || null;
        next();
    })(req, res, next);
}

module.exports = authMiddleware;
