var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


var server = require('http').createServer(app);

var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a new user!');
})


var msg = process.env.test || 'Hello local';
console.log(msg);


var config = require('./config') ;
mongoose.connect(config.mongodb);

var ideaSchema = mongoose.Schema({
    idea: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
});

var Idea = mongoose.model('Idea', ideaSchema)


app.use((req, res, next) => {
    res.broadcast = require('./broadcast')(io);
    next();
})

const ideaRoutes = require('./idea-routes')();
app.use(ideaRoutes);

app.get('/error', (req, res) => {
    throw "Error Error Software malfunction x.X bleep bleep blop";
    res.send(500);
})

var port = process.env.PORT || 1337;
server.listen(port);

