const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tareas = [];

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios' });
    }
    const nuevaTarea = { id: uuidv4(), titulo, descripcion };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Eliminar una tarea por ID
app.delete('/tareas/:id', (req, res) => {
    const { id } = req.params;
    tareas = tareas.filter(tarea => tarea.id !== id);
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
