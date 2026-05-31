/********************
 * Arquivo: Arquivo responsavel por juntar os script do banco de dados e o back-end
 * Autor: Gabriel Cavalcnate
 * Data: 30/05/2026
 * Versão: 1.0
 ********************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');

const knexDatabase = knex(knexConfig.development);

const getTipo = async function () {

    try {
      
        let sql = `select * from tb_tipo order by id_tipo desc`
        let result = await knexDatabase.raw(sql)
   
        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const getTipoWhereId = async function (id) {

    try {

        let sql = `select * from tb_tipo where id_tipo = ${id}`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch(error) {
        return false
    }
} 

const setInserirTipo = async function (doce) {
  try {

    let sql = `INSERT INTO tb_tipo(
        nome
    ) VALUES (?)`

    let result = await knexDatabase.raw(sql, [
      doce.nome
    ])

    if (result[0].affectedRows > 0)
      return true
    else
      return false

  } catch (error) {
    console.error(error)
    return false
  }
}

const setUpDateTipo = async function (doce){

    try{

        let sql = `update tb_tipo set
        nome       = ${doce.nome},
        where id_tipo = ${doce.id_tipo}' `

           let result = await knexDatabase.raw(sql)

        if(result){
            return true
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

const setLastIdTipo = async function () {
  try {
    let sql = `SELECT id_tipo FROM tb_tipo ORDER BY id_tipo  DESC LIMIT 1`

    let result = await knexDatabase.raw(sql)

    const rows = result[0] 

    if (Array.isArray(rows) && rows.length > 0) {
      return Number(rows[0].id_ordem_servico) 
    } else {
      return false
    }

  } catch (error) {
    console.error('ERRO DAO LAST ID:', error)
    return false
  }
}


const setDeleteTipo = async function (id) {

    try {

        let sql = `DELETE FROM tb_tipo WHERE id_tipo = ?`
        await knexDatabase.raw(sql, [id])

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getTipo,
    getTipoWhereId,
    setInserirTipo,
    setLastIdTipo,
    setDeleteTipo,
    setUpDateTipo,
    setDeleteTipo
}