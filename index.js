const express = require('express');
const { dbconection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

// Crear el servidor
const app = express();

// Base de datos
dbconection();

//CORS
app.use(cors());

//Directorio Público
app.use( express.static('public') );

//Lectura y parseo del body (antes body-parser)
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/subCategory', require('./routes/subCategoryRoute'));
app.use('/api/product', require('./routes/ProductRoute'));


// Escuchar las peticiones
app.listen (process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})