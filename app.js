require('dotenv').config();
const express   = require('express'),
bodyParser      = require('body-parser'), // To get body out of the request
axios = require('axios'),
path = require('path'),
serveStatic = require('serve-static');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', serveStatic(path.join(__dirname, 'public')));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
