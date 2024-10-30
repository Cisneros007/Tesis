const mysql = require('mysql2');

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            // Usuario de la base de datos
  password: '123456',      
  database: 'T_logistica', 
  port: 3306              
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
