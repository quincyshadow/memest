if(NODE_ENV == null || NODE_ENV !== 'production') {
  require('dotenv').config();
}
module.exports = {
  development: {
      client: 'pg',
      connection: {
        database: "memest",
        host: "localhost"
      },
      migrations: {
          directory: __dirname + '/database/migrations',
        },
      seeds: {
          directory: __dirname + '/database/seeds',
        },
    },
  production: {
      client: 'pg',
      connection: {
        user: 'postgres',
        host: 'postgres',
        database: 'memest',
        password: process.env.DB_PASS,
        port: 5432
    },
      migrations: {
          directory: __dirname + '/database/production/migrations',
        },
      seeds: {
          directory: __dirname + '/database/seeds',
        },
    },
};
