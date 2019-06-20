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
        host: 'localhost',
        database: 'memest',
        password: 'postgres',
        port: 5432
    },
      migrations: {
          directory: __dirname + '/database/migrations',
        },
      seeds: {
          directory: __dirname + '/database/seeds',
        },
    },
};
