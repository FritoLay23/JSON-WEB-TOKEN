const jwt = require('jsonwebtoken');
const config = require('../config');

// Funcion de verification de token.
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({auth: false, message: 'Not token provided'});
    
    const decoded = jwt.verify(token, config.secret);
    //Guardamos el id en req porque es un parametro que se encuentra a nivel global en la app
    // por ende, lo hacemos asi para que las demas rutas tengan el id.
    req.userId = decoded.id;
    next();
};

module.exports = verifyToken;