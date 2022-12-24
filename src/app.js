const express = require('express');
const app = express();

// Configuramos el server para que pueda leer JSON y pueda entender lo que le enviamos.
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./controllers/auth.controller'));

module.exports = app;