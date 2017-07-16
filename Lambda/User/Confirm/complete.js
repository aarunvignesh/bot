var output = require('./../../Output'),
    moment = require('moment'),
    Bluebird = require('bluebird'),
    config = require('./../../config'),
    request = require('request-promise');

module.exports = function(slot, session, userId){
    return new Bluebird((resolve, reject) => {

        document = {
            type: session.type,
            time:moment(session.showDate + 'T' + session.showTime).toDate(),
            userId: userId,
            slot: session || {}
        };

        document.slot.movie = document.slot.movie && document.slot.movie.toLowerCase(); 
        document.slot.city = document.slot.city && document.slot.city.toLowerCase(); 

         request({
            uri: config.web.url+'/bot/sell',
            method:'POST',
            json:true,
            body: document,
            headers:{
                "X-TOKEN":"227c12d8-00fc-4b27-8c96-2cd8bbdf6f1f"
            }
        }).then((result)=>{
            var closeText = '';
            if(result.id){
                closeText += 'Successfully Registered in our storage regarding your unique post reference id : '+ result.id;
            }
            resolve(output.closeSlot(closeText + "\n\nThank you for your interest... We will update you shortly on your Email. \n\n In the mean time you can also try \n\n https://www.primevideo.com/"));
        },(result)=>{
            
             reject(output.closeSlot("We are getting unexpected error in our Ecosystem. Soon We will get back."));
        });
    });
};                   