//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
const users = require("../controllers/users.js")
module.exports = function(app) {
  app.get('/', template.index);
  app.get('/memeDesigner', template.memeDesignerGET);
}


// app.get('/doctors/:id', template.appointmentNewGET);
// app.post('/doctors/:id', template.appointmentNewPOST);
// app.get('/doctor/login', users.index);
// app.post('/doctor/register', users.register);
// app.post('/doctor/login', users.login);
// app.use(authMiddleware);
// app.get('/appointments', users.appointmentListGET);
// app.get('/appointments/view/:id/', users.appointmentDetailsGET);
// app.put('/appointments/view/:id/', users.appointmentDetailsPUT);
// app.delete('/appointments/view/:id/', users.appointmentDetailsDELETE);
// app.post('/appointments/view/:id/newnote', template.noteNewPOST);


//Anything placed under authMiddleware requires authentication at this lev
// function authMiddleware(req, res, next){
//   if(!req.session.user_id){
//     res.redirect("/");
//   }else{
//     next();
//   }
// }
