var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tareaSchema = new Schema({
    responsable: { type: String, required: false },
    prioridad: { type: String, required: false },
    completada: { type: Boolean, required: false },
    etiquetas: [{ type: String, required: false }]
});

module.exports = mongoose.model('Tarea', tareaSchema);