/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerTipo = require('../controller/controller_tipo.js')

const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})


router.get('/', cors(), async function (request, response) {

    let tipo = await controllerTipo.mostrarTipos()
    response.status(tipo.status_code)
    response.json(tipo)
    
})

module.exports = router


//router.get('/:id_tipo', cors(), async function (request, response) {

   // let idDoceTipo = request.params.id_tipo
   // let doceId = await controllerDoce.pegarDoceidTipo(idDoceTipo)
    //response.status(doceId.status_code)
    //response.json(doceId)
    
//})

router.get('/:id', cors(), async function (request, response) {
    let idTipo = request .params.id
    let tipoId = await controllerTipo.pegarTipoid(idTipo)
    response.status(tipoId.status_code)
    response.json(tipoId)
    
})

router.delete('/:id', cors(), async function (request, response) {

    let idTipo = request.params.id

    let tipoId = await controllerTipo.deletarUmTipo(idTipo)
    response.status(tipoId.status_code)
    response.json(tipoId)
    
})

