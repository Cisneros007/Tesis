const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todas las rutas
router.get('/', (req, res) => {
  db.query('SELECT * FROM Rutas', (err, results) => {
    if (err) {
      console.error('Error al obtener rutas:', err);
      return res.status(500).json({ error: 'Error al obtener rutas' });
    }
    res.json(results);
  });
});

// Crear una nueva ruta

router.post('/', (req, res) => {
  const { ruta, horaSalida, horaLlegada, duracion } = req.body;  

  console.log('Datos recibidos:', req.body);  // Verificar los datos

  if (!ruta || !horaSalida || !horaLlegada || !duracion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'INSERT INTO Rutas (ruta, horaSalida, horaLlegada, duracion) VALUES (?, ?, ?, ?)', 
    [ruta, horaSalida, horaLlegada, duracion], 
    (err, result) => {
      if (err) {
        console.error('Error al crear ruta:', err);
        return res.status(500).json({ error: 'Error al crear ruta' });
      }
      res.status(201).json({ id: result.insertId, message: 'Ruta creada exitosamente' });
    }
  );
});


// Actualizar una ruta por ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // 'id' viene de los parámetros de la URL
  const { ruta, horaSalida, horaLlegada, duracion } = req.body;  // Usa 'ruta' en vez de 'nombreRuta'

  // Verifica que 'id' sea un número válido
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de ruta no válido' });
  }

  // Verifica que todos los campos obligatorios estén presentes
  if (!ruta || !horaSalida || !horaLlegada || !duracion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta para actualizar la ruta en la base de datos
  db.query(
    'UPDATE Rutas SET ruta = ?, horaSalida = ?, horaLlegada = ?, duracion = ? WHERE id = ?',
    [ruta, horaSalida, horaLlegada, duracion, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar ruta:', err);
        return res.status(500).json({ error: 'Error al actualizar ruta' });
      }

      // Si no se encontraron filas afectadas, significa que la ruta no existe
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Ruta no encontrada' });
      }

      // Si la actualización fue exitosa
      res.json({ message: 'Ruta actualizada correctamente' });
    }
  );
});


// Eliminar una ruta por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Obtiene el ID desde los parámetros de la URL

  // Verifica que 'id' sea un número válido
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de ruta no válido' });
  }

  // Realiza la consulta para eliminar la ruta
  const query = 'DELETE FROM Rutas WHERE id = ?'; // Asegúrate que la columna en tu base de datos sea 'id'
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar ruta:', error);
      return res.status(500).json({ error: 'Error al eliminar ruta' });
    }

    // Si no se encontraron filas afectadas, significa que la ruta no existe
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    // Si la eliminación fue exitosa
    res.json({ message: 'Ruta eliminada correctamente' });
  });
});



module.exports = router;
