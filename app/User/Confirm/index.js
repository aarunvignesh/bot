var output = require('./../../Output'),
    moment = require('moment');

module.exports = function(slot, session){
    var mapper={
        "movie" : "Movie : ",
        "theatre": "Theatre : ",
        "city":"City : ",
        "ticketcount": "Tickets : ",
        "showDate":"Date : ",
        "showTime": "Time : ",
        "name": "Name : ",
        "email":"Email : "
    },
    replyText = Object.keys(mapper)
                .map(function(value){
                    if(slot[value]){
                      return mapper[value] + slot[value];
                    }
                    if(session[value]){
                         if(value == "showDate"){

                            return mapper[value] + moment(session[value]).format('DD-MM-YYYY');
                        }
                        else if(value == "showTime"){
                             return mapper[value] + moment(session['showDate']+'T'+session[value]+':00Z').format('LT');
                        }
                        else{
                            return mapper[value] + session[value];
                        }
                    }
                }).join('    ');
    replyText += '  Is it ok to continue to post it? (Yes/No)'
    return output.confirmSlot('user',session, slot, replyText);
};