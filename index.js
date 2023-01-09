// Configuração inicial
const express = require('express')
const app = express()
require('dotenv').config()

// depois do db
const mongoose = require('mongoose')

//Forma de ler JSON / Middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//Rota inicial / Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
})

//Entregar uma Porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        'mongodb+srv://${DB_USER}:${DB_PASSWORD}@restfulapibanco.lq7ds.mongodb.net/bancodaapi?retryWrites=true&w=majority',
    )
    .then(() => {
        console.log('Conectou ao banco!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
