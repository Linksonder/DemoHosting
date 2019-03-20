var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socket = require('socket.io');


var app = express();
var http = require('http').Server(app);


var config = require('./config');
mongoose.connect(config.mongodb);

var ideaSchema = mongoose.Schema({
    idea: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
});

var Idea = mongoose.model('Idea', ideaSchema)


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/ideas', (req, res) => {
    Idea.find().exec((err, ideas) => res.send(ideas))
})

app.post('/ideas', (req, res) => {
    new Idea(req.body).save((err, idea) => {
        Idea.find().exec((err, ideas) => res.send(ideas))
    })  
})

app.get('/error', (req, res) => {
    throw "Error Error Software malfunction x.X bleep bleep blop";
    res.send(500);
})

var port = process.env.PORT || 1337;
http.listen(port);

