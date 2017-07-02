
var testObject =  { messageVersion: '1.0',
invocationSource: 'FulfillmentCodeHook',
//invocationSource: 'DialogCodeHook',
userId: 'd5w9yubonokyti6u7l792ulqkys7hmkj',
sessionAttributes: 
{
theatre: 'shiva',
    ticketcount: 2,
    movie: 'Shivam',
    city: 'chennai',
    showTime: '14:00',
    showDate: '2017-07-07',
    name:'arun',
    email:'a.s.arunvignesh@gmail.com',
type: 'buy'
 
},
bot: { name: 'awshelper', alias: null, version: '$LATEST' },
outputDialogMode: 'Text',
currentIntent: 
{ 
name: 'user',
confirmationStatus:'Confirmed',
slots: { 
   editField: 'time'
}
},
inputTranscript: 'a.s.arunvignesh@gmail.com' };


require('./index').handler(testObject,null,(a,b) => {
    //console.log(b);
});