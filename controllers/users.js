const knex = require("../database/knex.js");

module.exports = {
  index: function(req, res)
  {
    res.render("login");
  },

  appointmentListGET: (req, res) =>
  {
    let obj = {
      doctor: null,
      appointment: null
    }
    knex('doctor')
      .where('doctor.id', req.session.user_id)
      .join('appointment', 'appointment.doctor_id', '=', 'doctor.id')
      //.where('appointment.status','confirmed')
      .select('doctor.name as docname', 'appointment.id', 'appointment.name', 'appointment.date', 'appointment.reason', 'appointment.details', 'appointment.status')
      .then((results) =>
      {
        let completed = {doctor:null, appointments:[]}
        let confirmed = {doctor:null, appointments:[]};
        let unconfirmed = {doctor:null, appointments:[]};

        completed.doctor = results[0].docname;

        results.forEach((e) =>
        {
          switch (e.status)
          {
            case 'completed':
              completed.appointments.push(e);
              break;
            case 'confirmed':
              confirmed.appointments.push(e);
              break;
            case 'unconfirmed':
              unconfirmed.appointments.push(e);
              break;
            default:
          }
        });

        let groupedBy = {
          completed: completed,
          confirmed: confirmed,
          unconfirmed: unconfirmed
        }

        res.render("appointmentList",
        {
          document: groupedBy
        });
      })
  },
  appointmentDetailsGET: (req, res) =>
  {
    // console.log('--');

    const appt_id = parseInt(req.params.id);
    knex('appointment')
      .where('appointment.id', appt_id)
      .leftJoin('note', 'appointment.id', '=', 'note.appointment_id')
      .select('appointment.id', 'appointment.name', 'appointment.date', 'appointment.reason', 'appointment.details', 'appointment.status', 'note.comment')
      .then((results) =>
      {
        res.render('appointmentDetails',
        {
          document: results
        })
      })
  },
  appointmentDetailsPUT: (req, res) =>
  {
    // console.log('--');

    const appt_id = parseInt(req.params.id);
    if (req.body.status)
    {
      const appointmentBody = {
        status: req.body.status
      }
      knex('appointment')
        .where('appointment.id', appt_id)
        .update(appointmentBody)
        .then(() =>
        {
          knex('note')
            .where(appt_id, 'note.appointment_id')
            .update(noteBody)
        })
        .then(() =>
        {
          res.redirect('/appointments');
        })
    }
    else
    {
      const appointmentBody = {
        name: req.body.name,
        date: req.body.date,
        reason: req.body.reason,
        details: req.body.details,
      }
      knex('appointment')
        .where('appointment.id', appt_id)
        .update(appointmentBody)
        .then(() =>
        {
          knex('note')
            .where(appt_id, 'note.appointment_id')
            .update(noteBody)
        })
        .then(() =>
        {
          res.redirect('back');
        })
    }

    const noteBody = {
      note: req.body.comment
    }

  },
  appointmentDetailsDELETE: (req, res) =>
  {
    const appt_id = parseInt(req.params.id);

    knex('appointment')
      .where('appointment.id', appt_id)
      .del()
      .then(() => res.redirect('/appointments'))
  },
  /////////
  register: (req, res) =>
  {
    let registerb = {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
      img_url: req.body.imgUrl,
      password: req.body.password,
      confirmpw: req.body.confirmpw
    }
    if (registerb.confirmpw == registerb.password)
    {
      knex('doctor').insert(registerb).then(() =>
      {
        res.redirect('/doctor/login');
      })
    }
    else
    {
      res.redirect('/doctor/login');
    }
  },

  login: (req, res) =>
  {
    knex('doctor').where('email', req.body.email).then((results) =>
    {
      let user = results[0];
      if (!user)
      {
        res.redirect('/');
        return;
      }
      //
      if (user.password === req.body.password)
      {
        req.session.user_id = user.id;
        req.session.save(() =>
        {
          res.redirect('/appointments');
        })
      }
      else
      {
        res.redirect("/doctors/login");
      }
    })
  }
}
