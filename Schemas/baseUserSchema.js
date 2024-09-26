// Modulos
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Discriminator Key (campo rol)
const options = { discriminatorKey: 'rol', collection: 'users' };

// Esquema Base
const baseUserSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true,
    trim: true 
  },
  legajo: {
    type: Number,
    required: true,
    trim: true
},
  password: { 
    type: String, 
    required: true,
    minlength: 6, 
    maxlength: 128 // Maximo de 128 para el encriptado
  },
  estaActivo: { 
    type: Boolean, 
    default: true 
  }
}, options)

// Middleware preguardado
baseUserSchema.pre('save', async function (next) {
  // Verificar si la contraseña ya fue encriptada o no
  if (this.isModified('password')) {
    try {
      const salt = await bcryptjs.genSalt(10);  // Salteo
      this.password = await bcryptjs.hash(this.password, salt); // Hash
      next();  // Guardar
    } catch (error) {
      next(error);  
    }
  } else {
    next();  
  }
})

// Metodo para comparar passwords (para login authentication)
baseUserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcryptjs.compare(candidatePassword, this.password) // Comparar hashed passwords
  } catch (error) {
    throw new Error('Comparación de contraseña fallida')
  }
}

// Modelo
const BaseUser = mongoose.model('BaseUser', baseUserSchema)

// Exportar
module.exports = BaseUser