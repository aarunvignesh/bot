
var nodemailer = require('node-ses'),
    //nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    bluebird = require('bluebird'); 

mailStartTemplate = `
Hi {{name}},

This is mail regarding the 

<table>
<thead>
<td>S.No</td>
<td>Name</td>
<td>Email Id</td>
<td>Comment</td>
</thead>
<tbody>
`,
mailEndTemplate = `
</tbody>
</table>

Thank 
`,
transporter = nodemailer.createClient({ key: 'AKIAID23WZ27X5PQIFGQ', secret: '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' }),

// nodemailer.createTransport(smtpTransport({
//   service: 'Gmail',
//       auth: {
//           user: 'pingme.team@gmail.com',
//           pass: 'shivaping2208'
//       }
//   })),
  
  sender = (to, body)=>{
      return new bluebird((resolve, reject) => {
             transporter.sendEmail({
                from: 'pingme.team@gmail.com',

                to: to,
                subject: 'Regarding ',
                //text: 'Shiva',
                message: body
                }, 
                function(error, response){
                if(error){
                    console.log('Failed in sending mail');
                    console.dir({success: false, existing: false, sendError: true});
                    console.dir(error);
                    reject();
                }else{
                    console.log('Successful in sedning email');
                    console.dir({success: true, existing: false, sendError: false});
                    console.dir(response);
                    resolve();
                }
            });
      });
  };



module.exports = {
    sendEmail: function(result, document){
        return new bluebird((resolve,reject) => {
            mailStartTemplate = mailStartTemplate.replace('{{name}}', document.slot.name);
            var tableBody = result.map((value, index) => '<tr>'
                                    +'<td>'+ (index + 1) +'</td>'
                                    +'<td>'+ value.slot.name +'</td>'
                                    +'<td>'+ value.slot.email +'</td>'
                                    +'<td>'+ value.slot.comments +'</td>'
                                    +'</tr>').join(' ');

            sender(document.slot.email, mailStartTemplate + tableBody + mailEndTemplate)
            .then(()=>{
                resolve();
            },()=>{
                reject();
            });
        });
    }
};