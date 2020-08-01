var express = require('express');

var app = express();

var Tarea = require('../models/tarea');

// ===============================================================
// Obtener todas las Tareas
// ===============================================================
app.get('/', (req, res, next) => {

    Tarea.find({})
        .exec(
            (err, tareas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tareas',
                        errors: err
                    });
                }

                Tarea.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        tareas: tareas,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener Tarea
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Tarea.findById(id)
        .exec((err, tarea) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Tarea',
                    errors: err
                });
            }

            if (!tarea) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Tarea con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un Tarea con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                tarea: tarea
            });
        });
});


// ===============================================================
// Actualizar Tarea
// ===============================================================
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Tarea.findById(id, (err, tarea) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Tarea',
                errors: err
            });
        }

        if (!tarea) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Tarea con el ID ' + id + ' no existe',
                errors: { message: 'No existe un Tarea con ese ID' }
            });
        }

        tarea.responsable = body.responsable;
        tarea.prioridad = body.prioridad;
        tarea.completada = body.completada;
        tarea.etiquetas = body.etiquetas;

        tarea.save((err, tareaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Tarea',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                tarea: tareaGuardada
            });
        });
    });
});


// ===============================================================
// Crear Tarea
// ===============================================================
app.post('/', (req, res) => {
    var body = req.body;
    var tarea = new Tarea({
        tarea: body.responsable,
        tarea: body.prioridad,
        tarea: body.completada,
        tarea: body.etiquetas
    });

    tarea.save((err, tareaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Tarea',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            tarea: tareaGuardada
        });
    });
});


// ===============================================================
// Borrar Tarea
// ===============================================================
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Tarea.findByIdAndRemove(id, (err, tareaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Tarea',
                errors: err
            });
        }

        if (!tareaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Tarea con ese ID',
                errors: { message: 'No existe un Tarea con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            tarea: tareaBorrada
        });
    });
});

module.exports = app;