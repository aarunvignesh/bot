
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
            console.log(recieivedFields);
            if(session){
                Object.keys(session).forEach(function(value){
                    if(value != 'name' || value != 'email'){
                        delete session[value];
                    }
                });
            }
        }

        if(validationResult.err){
            return output.elicitSlot('buy', validationResult.field, session, slot);
        }
        else{
            var questionOrder = [
                "movie",
                "ticketcount",
                "showDate",
                "city",
                "comments"
            ],
            
            raiseQuestion = questionOrder.filter(function(value){return emptyFields.indexOf(value)>-1;});

            if(raiseQuestion.length > 0){
                return output.elicitSlot('buy', raiseQuestion[0], session, slot);
            }
            else{
                if(session && session.email && session.name){
                    Object.keys(slot).forEach(function(value){ session[value] = slot[value]}); 
                     return userValidate.userAskConfirm({
                         name: session.name,
                         email: session.email
                     }, session, 'buy');
                }
                else{
                    slot.type = 'buy';
                    return output.elicitSlot('user','name', slot, {
                        name: null,
                        email:null
                    });
                }
            }
        }
};