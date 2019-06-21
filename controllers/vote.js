const knex = require("../database/knex.js");
let date = require('date-and-time');

module.exports = {
  votePOST: function(req, res)
  {
    let id = parseInt(req.params.id);
    let adjustment = (req.body.vote);
    if (adjustment == '-1')
    {}
    else if (adjustment == '1')
    {
      adjustment = '+1'
    }
    else
    {
      adjustment = '+0'
    }

    console.log(id + '_pagefrom');

    knex('vote')
      .where(
      {
        document_id: id,
        ipaddr: req.session.ipaddr.toString()
      })
      .then((results) =>
      {
        if(results[0] == null)
        {
          // console.log('adding vote.')
          knex('vote')
            .insert(
            {
              document_id: id,
              ipaddr: req.session.ipaddr.toString(),
              vote: req.body.vote
            })
            .then(console.log('inserted'))
        }
        else if (results[0].vote == req.body.vote)
        {
          // console.log(results);
          // console.log('already voted that.')
          adjustment = '+0'
        }
        else if (results[0].vote)
        {
          // console.log('updating vote.')
          knex('vote')
            .where(
            {
              document_id: id,
              ipaddr: req.session.ipaddr.toString()
            })
            .update(
            {
              vote: req.body.vote
            })
            .then(() =>
            {
              // console.log('updated');
              knex.raw(`
              UPDATE document
              SET vote = vote${adjustment}
              WHERE id = '${id}'
              `)
                .then((results) =>
                {
                  //do nothing. however removing this .then causes knex.raw fail
                })
            })
        } //end modify
        else
        {
          // console.log('adding vote.')
          knex('vote')
            .insert(
            {
              document_id: id,
              ipaddr: req.session.ipaddr.toString(),
              vote: req.body.vote
            })
            .then(console.log('inserted'))
        }
      })
      .then(() =>
      {
        console.log('sent 200___' + adjustment)
        return res.status(200).send(
        {
          result: 'update',
          num: adjustment
        })
      })


    // knex('document')
    //   .where(
    //   {
    //     id: id
    //   })
    //   .then((results) =>
    //   {
    //     templateobj['template'] = results;
    //   })
    //   .then(() =>
    //   {
    //     knex('vote')
    //       .where(
    //       {
    //         ipaddr: req.session.ipaddr.toString(),
    //         document_id: id
    //       })
    //       .then((results) =>
    //       {
    //         templateobj['vote'] = results;
    //       })
    //   })
    //   .then(() =>
    //   {
    //     res.render('memeDocument', templateobj)
    //   })
  }
}
