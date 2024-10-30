require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Crea la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para CORS
app.use(cors());

// Middleware para manejo de JSON
app.use(express.json());

// Importa la conexión a la base de datos
const db = require('./db');

// Importa las rutas
const userRoutes = require('./routes/usuarios');
const clienteRoutes = require('./routes/clientes');

// Usa las rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/clientes', clienteRoutes);


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
