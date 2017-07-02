var output = require('./../../Output'),
    moment = require('moment');

module.exports = function(slot, session, type){
    var mapper={
        "movie" : "Movie : ",
        "theatre": "Theatre : ",
        "city":"City : ",
        "ticketcount": "Tickets : ",
        "showDate":"Date : ",
        "showTime": "Time : ",
        "name": "Name : ",
        "email":"Email : ",
        "comments":"comments : "
    },
    replyText = Object.keys(mapper)
                .map(function(value){
                    if(slot[value]){
                        if(value == "showDate"){

                            return mapper[value] + moment(slot[value]).format('DD-MM-YYYY');
                        }
                        else if(value == "showTime"){
                             return mapper[value] + moment(slot['showDate']+'T'+slot[value]+'Z').format('LT');
                        }
                        else{
                            return mapper[value] + slot[value];
                        }
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
                }).join('\n');
    replyText += '\nIs it ok to continue and post it? (Yes/No)';
    if(type){
        session.type = type;
    }
    Object.keys(slot).forEach((value)=>{
        session[value] = slot[value];
    });
    return output.confirmSlot('user',session, slot, replyText);
};