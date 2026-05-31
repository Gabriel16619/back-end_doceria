/*******************************
 * Objeto: Arquivo responsavel pela criptografia de senha dos usuarios
 * Data: 31/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************************/

const crypto = require('crypto');


function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex'); 
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex'); 
    return `${salt}:${hash}`;
}


function verifyPassword(password, storedHash) {
    const [salt, hash] = storedHash.split(':');
    const hashVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports = {
    hashPassword,
    verifyPassword
};