
var mongoose = require('mongoose'), 

schema = new mongoose.Schema({
    userId:{
        required: true,
        type: String
    },
    uniqueId:{
        type: String,
        unique: true
    },
    referCount:{
        type: Number,
        default: 0
    },
    isenabled:{
        type: Boolean,
        default: true
    },
    type:{
        required: true,
        type: String
    },
    time:{
        required: true,
        type: Date
    },
    createdAt:{
        required: true,
        type: Date
    },
    slot:Object
});

module.exports = mongoose.model('ticket', schema);