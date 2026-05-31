/***********************
 * Sobre: arquivo responsavel pela tratativa de dados da tb_relacional entre ordem_servico e celula
 * Data: 30/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const doceTipoDAO = require('../DAO/doce_tipo.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_messages.js')


const listarDocecomTipo = async function () {

       let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))
    
        try {
    
            let resultDoceTipo = await doceTipoDAO.getAllIdDocesByIdTipo()
    
                if(resultOrdemServicoCelula.length > 0){
                MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.resultDoceTipo = resultDoceTipo
    
                return MESSAGE.HEADER //404
        }
            else{
                return MESSAGE.ERROR_NOT_FOUND //404
            } 
        }
        catch(error){
            return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    
        }
}

const pegarDoceTipoId = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try{
        if(!isNaN(id) && id != '' && id != null && id > 0){

            let resulDoceTipo = await doceTipoDAO.getAllTipoByDoceId(Number(id))

            if(resulDoceTipo.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.resulDoceTipo = resulDoceTipo

                return MESSAGE.HEADER
                
            }else{
                return MESSAGES.ERROR_NOT_FOUND
            }
        }
    }catch(error){
         return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }  
}

const inserirTipoDoce = async function (DoceTipo, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosDoceTipo(DoceTipo)

            if (!validarDados) {

          
                let result = await doceTipoDAO.insertDoceTipo(DoceTipo)

                if (result) {

                 
                    let lastIdDoceTipo = await doceTipoDAO.getSelectLastIdDoceTipo(DoceTipo)
                    

                    if (lastIdD) {

                        DoceTipo.id_doce_tipo= lastIdDoceTipo
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = DoceTipo

                        return MESSAGE.HEADER 
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const atualizarDoceTipo = async function (DoceTipo, id, contentType) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
      
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosDoceTipo(DoceTipo)

            if (!validarDados) {

                let validarID = await pegarDoceTipoId(id)

           
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da
                    DoceTipo.id_doce_tipo = parseInt(id)

                    let result = await doceTipoDAO.setUpdateDoceTipo(DoceTipo)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = DoceTipo

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da função de buscarFilmeGeneroId (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados do Filme Gênero 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const excluirDoceTipo = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let validarID = await pegarDoceTipoId(id)

            if (validarID.status_code == 200) {

                let result = await  doceTipoDAO.setDeleteDoceTipo(parseInt(id))

              
                if (result) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                    MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                    delete MESSAGE.HEADER.response
                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarID //Retorno da função de buscarGeneroId (400 ou 404 ou 500)
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] invalido!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const validarDadosDoceTipo = async function (doceTipo) {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (doceTipo.id_doce === '' || doceTipo.id_doce === null || doceTipo.id_doce === undefined || isNaN(doceTipo.id_doce) || doceTipo.id_doce < 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Id_doce] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
        
    } else if (doceTipo.id_tipo === '' || doceTipo.id_tipo === null || doceTipo.id_tipo === undefined || isNaN(doceTipo.id_tipo) || doceTipo.id_tipo < 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Id_doce] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else{
        return true
    }
} 


module.exports = {
    listarDocecomTipo,
    pegarDoceTipoId,
    inserirTipoDoce,
     atualizarDoceTipo,
     excluirDoceTipo
}