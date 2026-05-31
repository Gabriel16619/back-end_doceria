/***********************
 * Sobre: arquivo responsavel pela tratativa de dados da tabela de tipo
 * Data: 30/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

/*****************
 * Arquivo: Arquivo responsavel por criar a tratativa de dados entre a DAO e o banco
 * Autor: Gabriel Cavalcante dos Santos
 * Data: 30/05/2026
 * Versão: 1.0
 ****************/

const usuarioDAO = require ('../DAO/usuario.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_mesages.js')

const mostrarUsuario =  async function () {

      let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultTipo = await usuarioDAO.getUsuarios()

        if (resultTipo && resultTipo.length > 0) {

            MESSAGE.HEADER.status                    = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code               = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.tipo             = resultTipo

            return MESSAGE.HEADER // 200

        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }

    } catch (error) {
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
}

//voltar aqui
const inserirUsuario = async function (tipo, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let dadosValidos = await validarDadosTipo(tipo)

            if (dadosValidos) {

                let result = await tiposDAO.setInserirTipo(tipo)

                if (result) {

                    let lastIdTipo = await tiposDAO.setLastIdTipo(tipo)

                    if (lastIdTipo) {                               
                        tipo.id_tipo = lastIdTipo                  
                        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message     = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response    = tipo          

                        return MESSAGE.HEADER

                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL 
                    }

                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL     
                }

            } else {
                return dadosValidos                                 
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE                      
        }

    } catch (error) {
        console.error('ERRO CONTROLLER:', error)
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER    
    }
}


const pegarUsuarioId = async function (id) {

  let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

  try {
    if (!isNaN(id) && id != '' && id != null && id > 0) {

      let resultUsuario = await usuarioDAO.getUsuarioId(Number(id))

      if (resultTipo.length > 0) {
        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.doce = resultUsuario

        return MESSAGE.HEADER
      } else {
        return MESSAGE.ERROR_NOT_FOUND 
      }

    } else {
      return MESSAGE.ERROR_REQUIRED_FIELDS
    }

  } catch (error) {

    return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
  }

}

//voltar aqui depois
const atualizarUsuario = async function (tipo, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (id) {

                let dadosValidos = await validarDadosTipo(tipo)

                if (dadosValidos) {

                    tipo.id_tipo = id

                    let result = await tiposDAO.setUpDateTipo(tipo)

                    if (result) {
                        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message     = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response    = tipo

                        return MESSAGE.HEADER

                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return dadosValidos // erro de validação
                }

            } else {
                return MESSAGE.ERROR_REQUIRE_FIELDS // 400 - id não informado
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        console.error('ERRO CONTROLLER:', error)
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


const deletarUmUsuario = async function (id) {
     let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (id != '' && id != null && id != undefined && !isNaN(id)) {

            let excluirUsuario = await pegarUsuarioId(id)

            if (excluirUsuario.status_code == 200) {

                let idUsuario = parseInt(id)

                let result = await usuarioDAO.setDeleteUsuario(idUsuario)

                if (result) {
                    MESSAGE.HEADER.status      = MESSAGE.SUCCESS_DELETE_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                    MESSAGE.HEADER.message     = MESSAGE.SUCCESS_DELETE_ITEM.message

                    return MESSAGE.HEADER

                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [ID] inválido!!"
            return MESSAGE.ERROR_REQUIRED_FIELDS 
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
}
    

const validarDadosUsuario = async function (usuario) {
    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    if(usuario.nome == null || usuario.nome == undefined || usuario.nome == '' || usuario.nome > 100){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Nome] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS 
    } else if(usuario.senha == null || usuario.senha == undefined || usuario.senha == '' || usuario.senha > 100){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Nome] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS 
    } 
    else{
        return true
    }
    
}

module.exports = {
   mostrarUsuario
}