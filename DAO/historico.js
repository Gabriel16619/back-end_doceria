/****************
 * Arquivo: Arquivo responsavel pela comunicação de dados da API com o banco de dados
 *          para consulta do historico de estoque.
 * Autor: Gabriel Cavalcante dos Santos
 * Data: 31/05/2026
 * Versão: 1.0
 ***************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');

const knexDatabase = knex(knexConfig.development);

const getHistorico = async function () {

    try {

        let sql = `
            SELECT 
                h.id_historico_estoque,
                u.nome as nome_usuario,
                d.nome as nome_doce,
                h.id_doce_ref,
                h.tipo_acao,
                h.data_acao
            FROM tb_historico_estoque h
            LEFT JOIN tb_doce d ON d.id_doce = h.id_doce
            LEFT JOIN tb_usuario u ON u.id_usuario = h.id_usuario
            ORDER BY h.data_acao DESC
        `

        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const getHistoricoPorDoce = async function (id_doce) {

    try {

        let sql = `
            SELECT 
                h.id_historico_estoque,
                u.nome as nome_usuario,
                d.nome as nome_doce,
                h.id_doce_ref,
                h.tipo_acao,
                h.data_acao
            FROM tb_historico_estoque h
            LEFT JOIN tb_doce d ON d.id_doce = h.id_doce
            LEFT JOIN tb_usuario u ON u.id_usuario = h.id_usuario
            WHERE h.id_doce = ? OR h.id_doce_ref = ?
            ORDER BY h.data_acao DESC
        `

        let result = await knexDatabase.raw(sql, [id_doce, id_doce])

        if (Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getHistorico,
    getHistoricoPorDoce
}