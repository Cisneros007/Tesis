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
  const { nombreRuta, horaSalida, horaLlegada, duracion } = req.body;
  
  // Verifica que todos los campos obligatorios estén presentes
  if (!nombreRuta || !horaSalida || !horaLlegada || !duracion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'INSERT INTO Rutas (nombreRuta, horaSalida, horaLlegada, duracion) VALUES (?, ?, ?, ?)',
    [nombreRuta, horaSalida, horaLlegada, duracion],
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
  const { id } = req.params;
  const { nombreRuta, horaSalida, horaLlegada, duracion } = req.body;
  
  // Verifica que todos los campos obligatorios estén presentes
  if (!nombreRuta || !horaSalida || !horaLlegada || !duracion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'UPDATE Rutas SET nombreRuta = ?, horaSalida = ?, horaLlegada = ?, duracion = ? WHERE idruta = ?',
    [nombreRuta, horaSalida, horaLlegada, duracion, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar ruta:', err);
        return res.status(500).json({ error: 'Error al actualizar ruta' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Ruta no encontrada' });
      }
      res.json({ message: 'Ruta actualizada correctamente' });
    }
  );
});

// Eliminar una ruta por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Rutas WHERE idruta = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar ruta:', err);
      return res.status(500).json({ error: 'Error al eliminar ruta' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }
    res.json({ message: 'Ruta eliminada correctamente' });
  });
});

module.exports = router;
