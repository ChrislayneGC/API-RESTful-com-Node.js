const router = require('express').Router()
const Person = require('../models/Person')

// CREATE - Criação de Dados--------------------------------------------------------------------------
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const person = {
        name,
        salary,
        approved,
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//READ - Leitura de Dados-------------------------------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {

    //Extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//UPDATE - Atualização de Dados (PUT= completo, PATCH= parcial)----------------------------------------
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//DELETE - Deletar Dados--------------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try {
        await Person.deleteOne({_id: id })
        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ erro: error })
    }

})

module.exports = router