var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser);

var port = process.env.PORT || 1337;
app.listen(port);