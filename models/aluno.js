const mongoose = require('mongoose')

const alunosSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    anoSemestreDeEntrada: {
        type: String,
        required: true
    },
    nomeCompleto: {
        type: String,
        required: true
    },
    Curso: {
        type: String,
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

module.exports = mongoose.model('Aluno', alunosSchema)