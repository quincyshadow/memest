const knex = require("../database/knex.js");
let date = require('date-and-time');

module.exports = {
  publishedIdGET: function(req, res)
  {
    let templateobj = {
      'template': 'asd',
      'userVote': '0',
      'username': req.session.ipaddr
    };

    let id = parseInt(req.params.id);

    // console.log(id);

    knex('document')
      .where(
      {
        id: id
      })
      .then((results) =>
      {
        let vote = results[0].vote
        if(Math.sign(vote) == 1 || Math.sign(vote) == 0)
        { vote = `+${vote}`}
        else {
          vote = `${vote}`
        }

        let resultsmodified =
        {
          id: id,
          voteTotal: vote,
          img_url: results[0].img_url,
          category: results[0].category
        }

        templateobj['template'] = resultsmodified;
      })
      .then(() =>
      {
        knex('vote')
          .where(
          {
            ipaddr: req.session.ipaddr,
            document_id: id
          })
          .then((results) =>
          {

          if(results[0])
          {
          // console.log(results[0].vote)
          Object.assign(templateobj, {userVote: results[0].vote});
          // console.log(templateobj);
          }
          else {
            console.error('no vote provided')
          }
          })
          .then(() =>
          {
            // console.log(templateobj);
            res.render('memeDocument', templateobj)
          })

      })
  }
}
