const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verify.token');

const User = require('../models/User');

// Ruta post de registro, no tiene una ruta get porque lo estoy comprobando con insomnia.
router.post('/signup', async (req, res, next) => {
    const {username, email, password} = req.body;
    const user =  new User({
        username,
        email,
        password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60 * 24});

    res.json({auth: true, token});
});

// Ruta get de navegacion, esta muestra como se va a comportar la app si estamos o no autenticados.
router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, {password: 0});
    if (!user)
        return res.status(404).send('Not User Found');
    
    res.json(user);
});

// Ruta post de login
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user)
        return res.status(404).send('Thre email not exists'); 

    const validPassword = await user.validatePassword(password);
    if (!validPassword)
        return res.status(404).json({auth: false, token: null});
    
    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60 * 24});
    res.json({auth: true, token});
});

module.exports = router;