const express = require('express')

const router = express.Router()

const Curso = require('../models/curso')

// GET all
router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find()

        return res.send(cursos)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('/:id', getCurso, async (req, res) => {

    res.json(res.curso)
})

// POST create
router.post('/', async (req, res) => {

    const curso = new Curso({
        nome: req.body.nome,
        area: req.body.area,
        regime: req.body.regime,
        numeroDeSemestres: req.body.numeroDeSemestres
    })

    try {
        const created = await curso.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PATCH update
router.patch('/:id', getCurso, async (req, res) => {
    if (req.body.nome != null) {
        res.curso.nome = req.body.nome
    }

    if (req.body.area != null) {
        res.curso.area = req.body.area
    }

    if (req.body.regime != null) {
        res.curso.regime = req.body.regime
    }

    if (req.body.numeroDeSemestres != null) {
        res.curso.numeroDeSemestres = req.body.numeroDeSemestres
    }

    try {
        const updated = await res.curso.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE remove
router.delete('/:id', getCurso, async (req, res) => {

    try {
        await res.curso.remove()

        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// middleware
async function getCurso(req, res, next) {
    try {
        curso = await Curso.findById(req.params.id)

        if (curso == null) {
            return res.status(404).json({message: 'Curso não encontrado'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.curso = curso

    next()
}

module.exports = router