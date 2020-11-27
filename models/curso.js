const mongoose = require('mongoose')

const cursosSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    regime: {
        type: String,
        required: true
    },
    numeroDeSemestres: {
        type: Number,
        required: true
    },
    criadoEm: {
        type: Date,
        required: true,
        default: Date.now
    },
    atualizadoEm: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Curso', cursosSchema)