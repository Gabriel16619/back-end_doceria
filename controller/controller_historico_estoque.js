/***********************
 * Sobre: arquivo responsavel pela tratativa de dados da tabela de historico_estoque
 * Data: 31/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const historicoDAO = require('../DAO/historico.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_mesages.js')

const mostrarHistorico = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultHistorico = await historicoDAO.getHistorico()

        if (resultHistorico && resultHistorico.length > 0) {

            MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response    = resultHistorico

            return MESSAGE.HEADER // 200

        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }

    } catch (error) {
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const mostrarHistoricoPorDoce = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultHistorico = await historicoDAO.getHistoricoPorDoce(Number(id))

            if (resultHistorico && resultHistorico.length > 0) {

                MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response    = resultHistorico

                return MESSAGE.HEADER // 200

            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }

        } else {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    mostrarHistorico,
    mostrarHistoricoPorDoce
}