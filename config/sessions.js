const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
var knex = require('../database/knex.js');

module.exports = function(app){
  const store = new KnexSessionStore({
      knex: knex,
      tablename: 'sessions' // optional. Defaults to 'sessions'
  });


  app.use(session({
      ipaddr: null,
      secret: 'asdwd3wdewfevw34f3qfwfadfarferc',
      cookie: {
          maxAge: 259200000 // 30 days
      },
      resave: false,
      saveUninitialized: true,
      store: store
  }));
}
