const knex = require("../database/knex.js");

module.exports = {
  index: function(req, res) {
    let resArr = {'username': null, 'array': []};

    knex("document")
      .leftOuterJoin('vote', 'document.id', '=', 'vote.document_id')
      .orderBy("document.id", "desc")
      .limit(3)
      .then(results => {
      resArr.username = req.session.ipaddr;

        results.forEach( (doc,index) => {
          let vote = doc.vote;
          if (Math.sign(vote) == 1 || Math.sign(vote) == 0) {
            vote = `+${vote}`;
          } else {
            vote = `-${vote}`;
          }

          let resultsmodified = {
            id: doc.id,
            voteTotal: doc.vote,
            img_url: doc.img_url,
            category: doc.category,
            userVote: 0
          };

          resArr.array.push({'template': resultsmodified});
        });
      })
      // .then(() => {
      //   knex("vote")
      //     .where({
      //       ipaddr: req.session.ipaddr,
      //       document_id: id
      //     })
      //     .then(results => {
      //       if (results[0]) {
      //         // console.log(results[0].vote)
      //         Object.assign(templateobj, { userVote: results[0].vote });
      //         // console.log(templateobj);
      //       } else {
      //         console.error("no vote provided");
      //       }
      //     })
          .then(() => {
            // console.log(templateobj);
            res.render("index", {template: resArr});
          });
  },
  memeDesignerGET: function(req, res) {
    knex("template").then(results => {
      results.username = req.session.ipaddr;
      res.render("memedesigner", {
        template: results
      });
    });
  }
  // appointmentNewPOST: function(req, res) {
  //     let doctor_id = parseInt(req.params.id); //this is nt secure (but the submission is unsecure anyway)
  //     const appointmentNewBody = {
  //       name: req.body.name,
  //       date: req.body.date,
  //       reason: req.body.reason,
  //       details: req.body.details,
  //       status: 'unconfirmed',
  //       doctor_id: doctor_id
  //     }
  //   knex('appointment')
  //   .insert(appointmentNewBody)
  //   .then(()=>
  //   {
  //     res.redirect('/')
  //   })
  //
  // },
  // noteNewPOST: function(req, res) {
  //     let appointment_id = parseInt(req.params.id); //this is nt secure (but the submission is unsecure anyway)
  //     const noteNewBody = {
  //       appointment_id: appointment_id,
  //       comment: req.body.note
  //     }
  //   knex('note')
  //   .insert(noteNewBody)
  //   .then(()=>
  //   {
  //     res.redirect('back')
  //   })
  //
  // },
  // createName: function(req, res) {
  //   req.session.name = req.body.name;
  //
  //   req.session.save(() => {
  //     res.redirect('/')
  //   })
  // }
};
