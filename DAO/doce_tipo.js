/***********************
 * Sobre: arquivo responsavel pela tratativa de dados da tb_relacional entre ordem_servico e celula
 * Data: 19/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');
const knexDatabase = knex(knexConfig.development);

const getAllIdDocesByIdTipo = async function(){

      try {

        let sql = `select * from tb_doce_tipo order by id_doce_tipo desc`
        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getAllTipoByDoceId = async function (id) {

    try {

        let sql = `SELECT * FROM tb_doce_tipo WHERE id_doce = ?`
        let result = await knexDatabase.raw(sql, [id])

        if (Array.isArray(result[0])) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const getSelectDoceTipoByTipoId = async function (id) {
    try {

        let sql = `select * from tbl_doce_tipo where id_tipo=${id} order by id_doce_tipo desc`
        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return result
        }
    } catch (error) {
       
        return false
    }
}

const insertDoceTipo = async function (doceTipo) {
  try {
    let sql = `
      INSERT INTO tb_doce_tipo (
        id_doce,
        id_tipo
      ) VALUES (?, ?)`

    let result = await knexDatabase.raw(sql, [
      doceTipo.id_doce,
      doceTipo.id_tipo
    ])

    if (result[0].affectedRows > 0)
      return true
    else
      return false

  } catch (error) {
    return false
  }
}

const getSelectLastIdDoceTipo = async function () {

    try {
        let sql = `select id_doce_tipo from tb_doce_tipo
                   order by id_doce_tipo desc limit 1`

        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return Number(result[0].id_doce_tipo)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}   

const setUpdateDoceTipo = async function (doceTipo) {

    try {
        let sql = `UPDATE tb_doce_tipo
                    SET
                        id_doce    = ${doceTipo.id_doce},
                        id_tipo           = ${doceTipo.id_tipo}}'
                    WHERE
                        id_doce_tipo = ${doceTipo.id_doce_tipo};`

        let result = await knexDatabase.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const setDeleteDoceTipo = async function (id) {

    try {
        let sql = `DELETE FROM tb_doce_tipo where id_doce_tipo = ${id}`

        let result = await knexConfig.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {

        return false
    }

}

module.exports = {
    getAllIdDocesByIdTipo,
    getAllTipoByDoceId,
    getSelectDoceTipoByTipoId,
    insertDoceTipo,
    getSelectLastIdDoceTipo,
    setUpdateDoceTipo,
    setDeleteDoceTipo
}