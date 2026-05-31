/*************************
 * Sobre: Arquivo respoinsavel por validar e envio de mensagem para trativa de erro.
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *************************/

const dataAtual = new Date()

/************************ MENSAGENS DE PADRONIZAÇÃO DO PROJETO **********************************/
const HEADER = {
    status: '',
    status_code: '',
    development: 'Gabriel Cavalcante dos SAntos',
    api_description: 'API para manipular dados do estoque da Doceria Gourmet IANES',
    version: '1.0.10.25',
    request_date: dataAtual.toLocaleString(),
    response: {}
}

/************************ MENSAGENS DE ERRO DO PROJETO ******************************************/
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados dados de retorno!!!'}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a problemas na camada da MODELAGEM de dados!!!'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a problemas na camada de CONTROLE de dados'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Não foi possivel  processar a requisição, devido a campos obrigatorios que não foram enviados corretamente, conforme a documentação da API!!!'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'Não foi possivel processar a requisição, pois o tipo de conteúdo enviado no body não é permitido. Deve-se utilizar JSON na API!!!'}
const ERROR_RELATION_TABLE = {status: false, status_code: 200, message: 'A requisição foi bem sucedida na criação do item principal, porém houveram problemas na tabela de relacionamento !!!'}

/************************ MENSAGENS DE SUCESSO DO PROJETO ***************************************/
const SUCCESS_REQUEST = {status: true, status_code: 200, message: 'Requisição bem sucedida!!!'}
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Requisição bem sucedida, objeto criado com sucesso!!!'}
const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: 'Requisição bem sucedida, objeto atualizado com sucesso!!!'}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Requisição bem sucedida, objeto deletado com sucesso!!!'}





module.exports = {
  HEADER,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER_MODEL,
  ERROR_INTERNAL_SERVER_CONTROLLER,
   ERROR_REQUIRED_FIELDS,
   ERROR_CONTENT_TYPE,
   ERROR_RELATION_TABLE,
   SUCCESS_REQUEST,
   SUCCESS_CREATED_ITEM,
   SUCCESS_UPDATED_ITEM,
   SUCCESS_DELETED_ITEM

}