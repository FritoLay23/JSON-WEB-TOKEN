const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema de los datos de usuarios que voy a introducir en la base de datos.
const userSchema = new Schema ({
    username: String,
    email: String,
    password: String
});

// Funcion de encriptacion de contraseña
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Funcion de validacion de contraseña
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);