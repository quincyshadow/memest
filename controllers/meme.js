const knex = require("../db/knex.js");
const sharp = require('sharp');
let date = require('date-and-time');

module.exports = {
  index: function(req, res)
  {
    // knex('meme')
    //   .where({
    //     id: parseInt(req.params.id)
    //   })
    //   .then((results) => {
    res.render('index',
    {});
  },
  memeDesignerGET: function(req, res)
  {
    knex('template')
      .then(results =>
      {
        res.render('memeDesigner',
        {
          template: results
        });
      })
  },
  memeDesignerPOST: function(req, res)
  {
    const base64img = req.body.imagedata.split(';base64,').pop();
    console.log('popped data')

    let imgBuffer = Buffer.from(base64img, 'base64');
    console.log('buffered')

    let memestring = date.format(new Date(), 'DDMMYYYYHHmmssSSS');
    memestring = 'meme' + memestring + '.png';
    let relUrlMeme = `./static/images/published/${memestring}`

    sharp(imgBuffer)
      .resize(400)
      .toFile(relUrlMeme)
      .then(data =>
      {
        if (data) {
          console.log('sent 200')
            return res.status(200).send({result: 'redirect', url:relUrlMeme})

        } else {
          console.log('sent 401')
            return res.status(401).send({error: "Something is wrong."})
        }
      })
      .catch(err =>
      {
        console.error(err)
      });


    //const appointmentNewBody = {
    //   name: req.body.name,
    //   date: req.body.date,
    //   reason: req.body.reason,
    //   details: req.body.details,
    //   status: 'unconfirmed',
    //   doctor_id: doctor_id
    // }
    // })

  }
}
