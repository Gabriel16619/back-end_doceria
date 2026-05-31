/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerUsuario = require('../controller/controller_usuario.js')

const router = express.Router()



router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})


router.get('/', cors(), async function (request, response) {

    let usuario = await controllerUsuario.mostrarUsuario()
    response.status(usuario.status_code)
    response.json(usuario)
    
})


router.get('/:id', cors(), async function (request, response) {
    let idUsuario = request .params.id
    let usuarioId = await controllerUsuario.pegarUsuarioId(idUsuario)
    response.status(usuarioId.status_code)
    response.json(usuarioId)
    
})

router.delete('/:id', cors(), async function (request, response) {

    let idUsuario = request.params.id

    let usuarioId = await controllerUsuario.deletarUmUsuario(idUsuario)
    response.status(usuarioId.status_code)
    response.json(usuarioId)
    
})

router.post('/', cors(), async function (request, response) {

    let contentType = request.headers['content-type']
  let adicionarUsuario = request.body

  let usuario = await controllerUsuario.inserirUsuario(adicionarUsuario, contentType)

  response.status(usuario.status_code)
  response.json(usuario)
    
})

router.put('/', cors(), async function (request, response) {

    let contentType = request.headers['content-type']
    let atualizarUsuario = request.body
    let usuario = await controllerUsuario.atualizarUsuario(atualizarUsuario, contentType)
    response.status(usuario.status_code)
    response.json(usuario)
    
})

module.exports = router

