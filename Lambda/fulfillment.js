/*
  The core function that receives the fulfilment slots and distributes 
  to the corresponding module
*/

var Bluebird = require('bluebird')
, hello = require('./Hello') 
, user    = require('./User')
, deleteRecord = require('./delete')
, fulfilment = (input, session, userId) => {
    return new Bluebird((resolve, reject) => {

        switch(input.currentIntent.name){
            case 'Vanakkam':
                    resolve(hello.fulFill(input.inputTranscript)); 
                    break;
            case 'user':
            
                    if(input.currentIntent.confirmationStatus === 'None')
                    {
                        resolve(user.userAskConfirm(input.currentIntent.slots,session));
                    }
                    else if(input.currentIntent.confirmationStatus === 'Denied') 
                    {
                        resolve(user.editUserinfo(input.currentIntent.slots,session));
                    }
                    else if(input.currentIntent.confirmationStatus === 'Confirmed')    
                    {
                        user.completeUserInfo(input.currentIntent.slots, session, userId).then((result)=>{
                            resolve(result);
                        },(result)=>{
                            resolve(result);
                        });
                    }
                    break ;
            case 'edit':
                    resolve(user.updateUserinfo(input.currentIntent.slots, session));
                    break;
            case 'removeticket':
                    resolve(deleteRecord.delete(input.currentIntent.slots, session));
        }
    });
};

module.exports = {
    fulfilment
};