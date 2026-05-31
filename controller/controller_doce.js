/*****************
 * Arquivo: Arquivo responsavel por criar a tratativa de dados entre a DAO e o banco
 * Autor: Gabriel Cavalcante dos Santos
 * Data: 30/05/2026
 * Versão: 1.0
 ****************/

const docesDAO = require ('../DAO/doce.js')
const doceTipoDAO = require ('../DAO/doce_tipo.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_mesages.js')


const mostrarDoces = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultDoce = await docesDAO.getDoces()

        if (resultDoce) {

            for (let doce of resultDoce) {
                let tipos = await docesDAO.getDoceComTipos(doce.id_doce) 
                doce.tipos = tipos                                        
            }

            MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response    = resultDoce                       

            return MESSAGE.HEADER // 200

        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }

    } catch (error) {
        console.error('ERRO CONTROLLER:', error)
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}
const pegarDoceid = async function (id) {

  let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

  try {
    if (!isNaN(id) && id != '' && id != null && id > 0) {

      let resultDoce = await docesDAO.getDoceswhreId(Number(id))

          if (resultDoce) {

            for (let doce of resultDoce) {
                let tipos = await docesDAO.getDoceComTipos(doce.id_doce) 
                doce.tipos = tipos                                        
            }

      if (resultDoce.length > 0) {
        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.doce = resultDoce

        return MESSAGE.HEADER
      } else {
        return MESSAGE.ERROR_NOT_FOUND 
      }

    } else {
      return MESSAGE.ERROR_REQUIRED_FIELDS
    }
}

  } catch (error) {

    return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
  }

}

//arrumar aqui
const inserirDoce = async function (doce, tipo, contentType) {

  let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

  try {

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

      let dadosValidos = await validarDadosDoce(doce)

      if (dadosValidos) {

     
        let result = await docesDAO.setInserirDoce(doce)
        
        if (result) {

          let lastIdDoce = await docesDAO.setLastIdDoce(doce)

          if (lastIdDoce) {

            let resultTipo = await doceTipoDAO.insertDoceTipo({
              id_doce:        lastIdDoce,
              id_tipo:        tipo.id_tipo
            })
         
          if (resultTipo) {
                doce.id_doce = lastIdDoce
                MESSAGE.HEADER.status      = MESSAGE.SUCCESS_CREATED_ITEM.status      
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code 
                MESSAGE.HEADER.message     = MESSAGE.SUCCESS_CREATED_ITEM.message   
                MESSAGE.HEADER.response    = doce

                return MESSAGE.HEADER
}

          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
          }

        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }

      } else {
        return dadosValidos // erro de validação
      }

    } else {
      return MESSAGE.ERROR_CONTENT_TYPE // 415
    }

  } catch (error) {
    console.error('ERRO CONTROLLER:', error)
    return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }

}

const atualizarDoce = async function (doce, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (id) {

                let dadosValidos = await validarDadosDoce(doce)

                if (dadosValidos) {

                    doce.id_doce = id

                    let result = await docesDAO.setUpDateDoce(doce)

                    if (result) {

                        let resultTipo = await docesDAO.setUpdateDoceTipo(doce)

                        if(resultTipo){

                        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message     = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response    = doce

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
    }

    } catch (error) {
        console.error('ERRO CONTROLLER:', error)
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



const deletarUmDoce = async function (id) {
     let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (id != '' && id != null && id != undefined && !isNaN(id)) {

            let excluirDoce = await pegarDoceid(id)

            if (excluirDoce.status_code == 200) {

                let idDoce = parseInt(id)

                let result = await docesDAO.setDeleteDoce(idDoce)

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
    

const validarDadosDoce = async function (doce) {
    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    if(doce.nome == null || doce.nome == undefined || doce.nome == '' || doce.nome > 100){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Nome] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if(doce.recheio == null || doce.recheio == undefined || doce.nome == '' || doce.nome > 100){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [recheio] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }
    else if(doce.sabor == null || doce.sabor == undefined || doce.sabor == '' || doce.sabor > 100){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [recheio] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }
    else if (doce.cobertura > 100){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [cobertura] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }
    else if(doce.data_validade == null || doce.data_validade == undefined ){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [id_celula] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }
    else if(doce.data_feito == null || doce.data_feito == undefined){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [data_feito] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }
    else if(doce.massa == null || doce.massa == undefined || doce.massa == '' || doce.massa > 100){
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [massa] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }
    else if(doce.id_tipo == null || doce.id_tipo == undefined || doce.id_tipo == '' || isNaN(doce.id_tipo) || doce.id_tipo < 0){
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [id_celula] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }

    else{
        return true
    }
    
}

module.exports = {
    mostrarDoces,
    pegarDoceid,
    inserirDoce,
    deletarUmDoce,
    atualizarDoce
}