/*
  The core function that receives the fulfilment slots and distributes 
  to the corresponding module
*/

var hello = require('./Hello') 
, user    = require('./User')
, fulfilment = (input, session) => {
    switch(input.currentIntent.name){
        case 'Vanakkam':
                return hello.fulFill(input.inputTranscript); 
        case 'user':
                if(input.currentIntent.confirmationStatus === 'None')
                {
                    return user.userConfirm(input.currentIntent.slots,session);
                }
                else if(input.currentIntent.confirmationStatus === 'Denied') 
                {

                }
                else if(input.currentIntent.confirmationStatus === 'Confirmed')    
                {

                }
    }
};

module.exports = {
    fulfilment
};