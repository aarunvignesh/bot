
var mongoose = require('mongoose'), 

schema = new mongoose.Schema({
    userId:{
        required: true,
        type: String
    },
    type:{
        required: true,
        type: String
    },
    slot:Object
});

module.exports = mongoose.model('ticket', schema);