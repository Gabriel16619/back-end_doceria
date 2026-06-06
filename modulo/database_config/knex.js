module.exports = {
    development: {
     
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'root', 
        password: '12345678', 
        database: 'doceria',
        port: 3306,
        
       
        charset: 'utf8mb4'
      },
      
      migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/s67eeds'
      }
    },
    
  };