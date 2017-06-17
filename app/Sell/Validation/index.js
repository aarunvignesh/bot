
const moment = require("moment"),
      output = require('./../../Output');

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

        if(validationResult.err){
            return output.elicitSlot('sell', validationResult.field, null, slot);
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
                return output.elicitSlot('sell', raiseQuestion[0], null, slot);
            }
            else{
                if(session && session.email){

                }
                else{
                    return output.elicitSlot('user','name', slot, {
                        name: null,
                        email:null
                    });
                }
            }
        }
};