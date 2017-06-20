
const moment = require("moment"),
      output = require('./../../Output'),
      userValidate = require('./../../User');

function validateReceivedFields(recieivedFields, slot){
    if(slot['showDate']){
        var date = moment(slot.showDate),
        todayDate = new Date();
        if(!date.isAfter(todayDate)){
            return {
                err: 'Date is in past',
                field: 'showDate'
            }
        }
    }
    return true;
};


module.exports = function(slot,session){
    var slotFields = Object.keys(slot),
        recieivedFields = slotFields.filter(function(value){return slot[value]}),
        emptyFields = slotFields.filter(function(value){return !slot[value]});

        var validationResult = validateReceivedFields(recieivedFields, slot);

        if(recieivedFields.length == 0){
            if(session){
                Object.keys(session).forEach(function(value){
                    if(value != 'name' || value != 'email'){
                        delete session[value];
                    }
                });
            }
        }

        if(validationResult.err){
            return output.elicitSlot('sell', validationResult.field, session, slot);
        }
        else{
            var questionOrder = [
                "movie",
                "theatre",
                "ticketcount",
                "showDate",
                "showTime",
                "city"
            ],
            
            raiseQuestion = questionOrder.filter(function(value){return emptyFields.indexOf(value)>-1;});

            if(raiseQuestion.length > 0){
                return output.elicitSlot('sell', raiseQuestion[0], session, slot);
            }
            else{
                if(session && session.email && session.name){ 
                   Object.keys(slot).forEach(function(value){ session[value] = slot[value]}); 
                   return userValidate.userAskConfirm({name: session.name, email: session.email},session, 'sell');
                }
                else{
                    slot.type = 'sell';
                    return output.elicitSlot('user','name', slot, {
                        name: null,
                        email:null
                    });
                }
            }
        }
};