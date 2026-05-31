/****************
 * Arquivo: Arquivo responsavel epla comuncação de dados da API com o banco de dados para que o usuario
 *          faça as suas requisições dentro do software.
 * Autor: Gabriel Cavalcante dos Santos
 * Data: 31/05/2026
 * Versão: 1.0
 ***************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');

const knexDatabase = knex(knexConfig.development);

const getUsuarios = async function () {

      try {
      
        let sql = `select * from tb_usuario order by id_usuario desc`
        let result = await knexDatabase.raw(sql)
   
        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const getUsuarioId = async function (id) {

    try{

        let sql = `select * from tb_usuario where id_usuario = ${id}`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
    
}

const adicionarUsuario = async function (usuario) {

    try{

        let sql = `insert into tb_usuario (nome, senha) values(?, ?)`

        let result = await knexDatabase.raw(sql, [
      usuario.nome,
      usuario.senha
    ])

    if (result[0].affectedRows > 0)
      return true
    else
      return false

    }catch(error){

    }
    
}

const setUpDateUsuario = async function (usuario){

    try{

        let sql = `update tb_usuario set

        nome       = ${usuario.nome},
        senha    = '${usuario.senha}'
        
        where id_usuario = ${doce.id_usuario} `

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
    
const setLastIdUsuario = async function () {
  try {
    let sql = `SELECT id_usuario FROM tb_usuario ORDER BY id_usuario DESC LIMIT 1`

    let result = await knexDatabase.raw(sql)

    const rows = result[0] 

    if (Array.isArray(rows) && rows.length > 0) {
      return Number(rows[0].id_usuario) 
    } else {
      return false
    }

  } catch (error) {
    
    return false
  }
}

const setDeleteUsuario = async function (id) {

    try {

        let sql = `DELETE FROM tb_usuario WHERE id_usuario = ?`
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
    getUsuarios,
    getUsuarioId,
    adicionarUsuario,
    setUpDateUsuario,
    setLastIdUsuario,
    setDeleteUsuario

}