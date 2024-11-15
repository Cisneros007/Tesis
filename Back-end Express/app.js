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
const rutaRoutes = require('./routes/rutas'); // Importa las rutas de Rutas
const enviosRoutes = require('./routes/envios'); // Importa las rutas de Envíos
const servicioTerrestreRoutes = require('./routes/serviciosTerrestres'); // Importa las rutas de Servicios Terrestres
const servicioAereoRoutes = require('./routes/serviciosAereos'); // Importa las rutas de Servicios Aéreos
const trackingRoutes = require('./routes/TrackingRoutes');

// Usa las rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/rutas', rutaRoutes); // Usa las rutas de Rutas
app.use('/api/envios', enviosRoutes); // Usa las rutas de Envíos
app.use('/api/servicios-terrestres', servicioTerrestreRoutes); // Usa las rutas de Servicios Terrestres
app.use('/api/servicios-aereos', servicioAereoRoutes); // Usa las rutas de Servicios Aéreos
app.use('/api/tracking', trackingRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
