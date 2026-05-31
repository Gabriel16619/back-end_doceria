/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerDoce = require('../controller/controller_doce')



const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})



router.get('/', cors(), async function (request, response) {

    let doce = await controllerDoce.mostrarDoces()
    response.status(doce.status_code)
    response.json(doce)
    
})



router.get('/:id', cors(), async function (request, response) {
    let idDoce = request .params.id
    let doceId = await controllerDoce.pegarDoceid(idDoce)
    response.status(doceId.status_code)
    response.json(doceId)
    
})

router.post('/', cors(), async function (request, response) {

    let contentType = request.headers['content-type']
  let adicionarDoce = request.body

  let doce = await controllerDoce.inserirDoce(adicionarDoce, contentType)

  response.status(doce.status_code)
  response.json(doce)
    
})

router.put('/', cors(), async function (request, response) {

    let contentType = request.headers['content-type']
    let atualizarDoce = request.body
    let doce = await controllerDoce.atualizarDoce(atualizarDoce, contentType)
    response.status(doce.status_code)
    response.json(doce)
    
})

router.delete('/:id', cors(), async function (request, response) {

    let idDoce = request.params.id

    let doceId = await controllerDoce.deletarUmDoce(idDoce)
    response.status(doceId.status_code)
    response.json(doceId)
    
})

module.exports = router

