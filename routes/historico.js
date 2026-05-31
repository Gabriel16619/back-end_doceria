/***********************
 * Sobre: rotas para endpoints do historico de estoque
 * Data: 31/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const express = require('express')
const cors = require('cors')

const controllerHistorico = require('../controller/controller_historico_estoque')

const router = express.Router()

router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
    router.use(cors())
    next()
})


router.get('/', cors(), async function (request, response) {
    let historico = await controllerHistorico.mostrarHistorico()
    response.status(historico.status_code)
    response.json(historico)
})


router.get('/:id', cors(), async function (request, response) {
    let id = request.params.id
    let historico = await controllerHistorico.mostrarHistoricoPorDoce(id)
    response.status(historico.status_code)
    response.json(historico)
})

module.exports = router