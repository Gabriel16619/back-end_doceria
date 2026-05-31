/***********************
 * Sobre: arquivo responsavel pela criação e gerenciamento
 * das rotas dos crud do back-end, para testes e para uso no front end
 * Data: 30/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()


app.use(cors())
app.use(express.json())


app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// Rotas
const DoceRoutes = require('./routes/doce')
app.use("/v1/doceriagourmet/doce", DoceRoutes) 

const TipoRoutes = require('./routes/tipo')
app.use("/v1/doceriagourmet/tipo", TipoRoutes) 

const UsuarioRoutes = require('./routes/usuario')
app.use("/v1/doceriagourmet/usuario", UsuarioRoutes)


app.listen(PORT, function(){
    console.log('API aguardando resposta ;)')
})