module.exports = function(io){
    return {
        updateIdeas: function(ideas){
            io.emit('new_idea', ideas);
        }
    }
}