/*
  The core function that receives the Dialog slots and distributes 
  to the corresponding validation module
*/
var sell = require('./Sell');

var validate = (currentIntent,session)=>{
    switch(currentIntent.name){
        case 'sell':
           return  sell.validate(currentIntent.slots, session);
    }
};

module.exports = {
    validate
};