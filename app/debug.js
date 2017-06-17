
var testObject = { messageVersion: '1.0',
invocationSource: 'FulfillmentCodeHook',
userId: 'd5w9yubonokyti6u7l792ulqkys7hmkj',
sessionAttributes: 
{ theatre: 'Palazzo Cinemas',
ticketcount: '3',
movie: 'Shivam',
city: 'chenna',
showTime: '17:30',
showDate: '2017-06-22' },
bot: { name: 'awshelper', alias: null, version: '$LATEST' },
outputDialogMode: 'Text',
currentIntent: 
{ name: 'user',
slots: { name: 'Arun Shivan', email: 'a.s.arunvignesh@gmail.com' },
confirmationStatus: 'None' },
inputTranscript: 'a.s.arunvignesh@gmail.com' };

// {
//     messageVersion: '1.0',
//     invocationSource: 'DialogCodeHook',
//     userId: 'ft0r7jyuibns89h9etrorrco8yi0q8p7',
//     sessionAttributes: null,
//     bot: { name: 'awshelper', alias: null, version: '$LATEST' },
//     outputDialogMode: 'Text',
//     currentIntent:
//     {
//         name: 'sell',
//         slots:
//         {
//             ticketcount: 2,
//             comments: null,
//             movie: '',
//             showTime: '',
//             buyergender: null,
//             showDate: '2017-12-12'
//         },
//         confirmationStatus: 'None'
//     },
//     inputTranscript: '3.00pm'
// };

require('./index').handler(testObject,null,(a,b) => {
    console.log(b);
});