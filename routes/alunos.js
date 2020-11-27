const express = require('express')

const router = express.Router()

const Aluno = require('../models/aluno')

// GET all
router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.find()

        return res.send(alunos)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('/:id', getAluno, async (req, res) => {

    res.json(res.aluno)
})

// POST create
router.post('/', async (req, res) => {

    const aluno = new Aluno({
        nomeCompleto: req.body.nomeCompleto,
        matricula: req.body.matricula,
        Curso: req.body.Curso,
        anoSemestreDeEntrada: req.body.anoSemestreDeEntrada
    })

    try {
        const created = await aluno.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PATCH update
router.patch('/:id', getAluno, async (req, res) => {
    if (req.body.nomeCompleto != null) {
        res.aluno.nomeCompleto = req.body.nomeCompleto
    }

    if (req.body.matricula != null) {
        res.aluno.matricula = req.body.matricula
    }

    if (req.body.Curso != null) {
        res.aluno.Curso = req.body.Curso
    }

    if (req.body.anoSemestreDeEntrada != null) {
        res.aluno.anoSemestreDeEntrada = req.body.anoSemestreDeEntrada
    }

    try {
        const updated = await res.aluno.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE remove
router.delete('/:id', getAluno, async (req, res) => {

    try {
        await res.aluno.remove()

        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// middleware
async function getAluno(req, res, next) {
    try {
        aluno = await Aluno.findById(req.params.id)

        if (aluno == null) {
            return res.status(404).json({message: 'Aluno não encontrado'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.aluno = aluno

    next()
}

module.exports = router