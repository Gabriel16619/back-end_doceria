/********************
 * Arquivo: Arquivo responsavel por juntar os script do banco de dados e o back-end
 * Autor: Gabriel Cavalcnate
 * Data: 30/05/2026
 * Versão: 1.0
 ********************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');

const knexDatabase = knex(knexConfig.development);

const getDoces = async function () {

    try {
      
        let sql = `select * from tb_doce order by id_doce desc`
        let result = await knexDatabase.raw(sql)
   
        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const getDoceComTipos = async function (id_doce) {
    let sql = `SELECT 
                    t.id_tipo,
                    t.nome
               FROM tb_doce_tipo dt
               INNER JOIN tb_tipo t ON t.id_tipo = dt.id_tipo
               WHERE dt.id_doce = ?`

    let result = await knexDatabase.raw(sql, [id_doce])
    
    if (result) {
        return result
    } else {
        return false
    }
}

const getDoceswhreId = async function (id) {

    try {

        let sql = `select * from tb_doce where id_doce = ${id}`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch(error) {
        return false
    }
} 

const setInserirDoce = async function (doce) {
  try {

    let sql = `INSERT INTO tb_doce(
        nome,
        recheio,
        sabor,
        cobertura,
        data_validade,
        data_feito,
        massa
    ) VALUES (?, ?, ?, ?, ?, ?, ?, )`

    let result = await knexDatabase.raw(sql, [
      doce.nome,
      doce.recheio,
      doce.sabor,
      doce.cobertura,
      doce.data_validade,
      doce.data_feito,
      doce.massa
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

const setUpDateDoce = async function (doce){

    try{

        let sql = `update tb_doce set

        nome       = ${doce.nome},
        recheio      = '${doce.recheio}',
        sabor              = '${doce.sabor}',
        cobertura           = '${doce.cobertura}',
        data_validade  = '${doce.data_validade}',
        data_feito         = '${doce.data_feito}',
        massa           = '${doce.massa}'
        
        where id_doce = ${doce.id_doce} `

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

const setUpdateDoceTipo = async function (doce) {

    try {

        let sqlDelete = `DELETE FROM tb_doce_tipo 
                         WHERE id_doce = ${doce.id_doce}`

        await knexDatabase.raw(sqlDelete)

        for (let tipo of doce.tipos) {

            let sqlInsert = `INSERT INTO tb_doce_tipo (id_doce, id_tipo)
                             VALUES (${doce.id_doce}, ${tipo.id_tipo})`

            let result = await knexDatabase.raw(sqlInsert)

            if (!result) return false
        }

        return true

    } catch (error) {
        return false
    }
}

const setLastIdDoce = async function () {
  try {
    let sql = `SELECT id_doce FROM tb_doce ORDER BY id_doce DESC LIMIT 1`

    let result = await knexDatabase.raw(sql)

    const rows = result[0] 

    if (Array.isArray(rows) && rows.length > 0) {
      return Number(rows[0].id_doce) 
    } else {
      return false
    }

  } catch (error) {
    console.error('ERRO DAO LAST ID:', error)
    return false
  }
}


const setDeleteDoce = async function (id) {

    try {

     
        let sqlDoceTipo = `DELETE FROM tb_doce_tipo WHERE id_doce = ?`
        await knexDatabase.raw(sqlDoceTipo, [id])

       
        let sqlDoce = `DELETE FROM tb_doce WHERE id_doce = ?`
        let result = await knexDatabase.raw(sqlDoce, [id])

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

module.exports ={
    getDoces,
    getDoceComTipos,
    getDoceswhreId,
   getDoceswhreId,
    setInserirDoce,
    setLastIdDoce,
    setDeleteDoce,
    setUpDateDoce,
    setUpdateDoceTipo
}