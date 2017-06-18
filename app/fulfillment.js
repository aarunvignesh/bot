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
                console.log(input.currentIntent.confirmationStatus);
                if(input.currentIntent.confirmationStatus === 'None')
                {
                    return user.userAskConfirm(input.currentIntent.slots,session);
                }
                else if(input.currentIntent.confirmationStatus === 'Denied') 
                {
                    return user.editUserinfo(input.currentIntent.slots,session);
                }
                else if(input.currentIntent.confirmationStatus === 'Confirmed')    
                {

                }
                break ;
        case 'edit':
                return user.updateUserinfo(input.currentIntent.slots, session);
    }
};

module.exports = {
    fulfilment
};