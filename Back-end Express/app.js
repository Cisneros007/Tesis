require('dotenv').config();  // Cargar las variables de entorno del archivo .env
const express = require('express');  // Importar Express
const cors = require('cors');  // Importar CORS

// Crea la aplicación Express
const app = express();
const port = process.env.PORT || 3000;  // Usar el puerto de la variable de entorno o el 3000 por defecto

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes con datos JSON
app.use(express.json());

// Importa la conexión a la base de datos
const db = require('./db');

const clienteRoutes = require('./routes/clientes');
const rutaRoutes = require('./routes/rutas'); // Importa las rutas de Rutas
const enviosRoutes = require('./routes/envios'); // Importa las rutas de Envíos
const servicioTerrestreRoutes = require('./routes/serviciosTerrestres'); // Importa las rutas de Servicios Terrestres
const servicioAereoRoutes = require('./routes/serviciosAereos'); // Importa las rutas de Servicios Aéreos
const tracking = require('./routes/Tracking');  // Adjust the path as needed
// Importa las rutas de diferentes módulos
const empleadoRoutes = require('./routes/empleados');  // Rutas de empleados
const trackingRoutes = require('./routes/TrackingRoutes');

// Usar las rutas definidas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/rutas', rutaRoutes); // Usa las rutas de Rutas
app.use('/api/tracking', tracking);
app.use('/api/envios', enviosRoutes);  // Rutas de envíos
app.use('/api/servicios-terrestres', servicioTerrestreRoutes);  // Rutas de servicios terrestres
app.use('/api/servicios-aereos', servicioAereoRoutes);  // Rutas de servicios aéreos
app.use('/api/tracking', trackingRoutes);

// Inicia el servidor en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
