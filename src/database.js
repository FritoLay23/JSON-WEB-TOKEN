const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose');

mongoose.set('strictQuery', true);

// Conectamos a la base de datos.
mongoose.connect('mongodb://127.0.0.1/jwt-node')
    .then(db => console.log('Database is connected'));