require('dotenv').config();  // Cargar las variables de entorno del archivo .env
const express = require('express');  // Importar Express
const cors = require('cors');  // Importar CORS

// Crea la aplicación Express
const app = express();
const port = process.env.PORT || 3000;  

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes con datos JSON
app.use(express.json());

// Importa la conexión a la base de datos
const db = require('./db');

// Importa las rutas de diferentes módulos
const empleadoRoutes = require('./routes/empleados');  // Rutas de empleados
const clienteRoutes = require('./routes/clientes');  // Rutas de clientes
const rutaRoutes = require('./routes/rutas');  // Rutas de rutas
const enviosRoutes = require('./routes/envios');  // Rutas de envíos
const servicioTerrestreRoutes = require('./routes/serviciosTerrestres');  // Rutas de servicios terrestres
const servicioAereoRoutes = require('./routes/serviciosAereos');  // Rutas de servicios aéreos
const trackingRoutes = require('./routes/TrackingRoutes');

// Usar las rutas definidas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/rutas', rutaRoutes);  // Rutas de rutas
app.use('/api/envios', enviosRoutes);  // Rutas de envíos
app.use('/api/servicios-terrestres', servicioTerrestreRoutes);  // Rutas de servicios terrestres
app.use('/api/servicios-aereos', servicioAereoRoutes);  // Rutas de servicios aéreos
app.use('/api/tracking', trackingRoutes);
app.use('/api/agencias', agenciasRoutes);


// Inicia el servidor en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
