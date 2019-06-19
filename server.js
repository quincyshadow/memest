const express = require("express");
const methodOverride = require('method-override')
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json({limit: '100mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.use(methodOverride('_method'))

//To access static assets use prefix of /static/.... (storage: folder '/static' (lol))
app.use('/static', express.static(path.join(__dirname, 'static')))

require('./config/sessions')(app);

app.set('view engine', 'ejs');

var routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(port, function() {
  console.log('Listening on', port);
});
