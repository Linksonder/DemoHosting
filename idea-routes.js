var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Idea = mongoose.model('Idea');

module.exports = function(){

    router.get('/ideas', (req, res) => {
        Idea.find().exec((err, ideas) => res.send(ideas))
    })
    
    router.post('/ideas', (req, res) => {
        new Idea(req.body).save((err, idea) => {
            Idea.find().exec((err, ideas) => {
                res.broadcast.updateIdeas(ideas);
                res.send(ideas);
            })
        })  
    })

    return router;
};