//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
const meme = require("../controllers/meme.js")
const users = require("../controllers/users.js")
const memeDocument = require("../controllers/memeDocument.js")
const vote = require("../controllers/vote.js")
const knex = require("../database/knex.js")
var session = require('express-session')


module.exports = function(app)
{
  app.use(guestAuthMW);
  app.get('/', template.index);
  app.get('/meme_designer', template.memeDesignerGET);
  //Post is for the publish meme feature.
  app.post('/meme_designer', meme.memeDesignerPOST);
  app.get('/published/:id', memeDocument.publishedIdGET);
  app.post('/published/:id', vote.votePOST);
}

function guestAuthMW(req, res, next)
{
  if (req.session.user_id == null &&  req.session.ipaddr == null)
  {
    var ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    knex('guestusers')
      .where(
      {
        ipaddr: ipString
      })
      .then((results) =>
      {
        if (results)
        {
          req.session.ipaddr = ipString;
          // console.log(req.session.ipaddr);
        }
        else
        {
          req.session.ipaddr = ipString;
          knex('guestusers')
            .insert(
            {
              ipaddr: ipString,
              has_voted: 0
            })
        }
      })
      .then(() =>
      {
        console.log(req.session.ipaddr + '_guestsession created');
        next()
      })
  }
  else {
    console.log(req.session.ipaddr + '_session present.');
    next();
  }
}

//Anything placed under authMiddleware requires authentication at this lev
// function authMiddleware(req, res, next){
//   if(!req.session.user_id){
//     res.redirect("/");
//   }else{
//     next();
//   }
// }
