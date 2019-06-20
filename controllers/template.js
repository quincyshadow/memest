const knex = require("../database/knex.js");

module.exports = {
  index: function(req, res) {
    // knex('meme')
    //   .where({
    //     id: parseInt(req.params.id)
    //   })
    //   .then((results) => {
        res.render('index', {});
  },
  memeDesignerGET: function(req, res) {
    knex('template')
      .then(results => {
        res.render('memedesigner', {
          template: results
        });
      })
  },
  appointmentNewPOST: function(req, res) {
      let doctor_id = parseInt(req.params.id); //this is nt secure (but the submission is unsecure anyway)
      const appointmentNewBody = {
        name: req.body.name,
        date: req.body.date,
        reason: req.body.reason,
        details: req.body.details,
        status: 'unconfirmed',
        doctor_id: doctor_id
      }
    knex('appointment')
    .insert(appointmentNewBody)
    .then(()=>
    {
      res.redirect('/')
    })

  },
  noteNewPOST: function(req, res) {
      let appointment_id = parseInt(req.params.id); //this is nt secure (but the submission is unsecure anyway)
      const noteNewBody = {
        appointment_id: appointment_id,
        comment: req.body.note
      }
    knex('note')
    .insert(noteNewBody)
    .then(()=>
    {
      res.redirect('back')
    })

  },
  createName: function(req, res) {
    req.session.name = req.body.name;

    req.session.save(() => {
      res.redirect('/')
    })
  }
}
