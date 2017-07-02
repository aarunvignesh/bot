
var nodemailer = require('node-ses'),
    //nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    bluebird = require('bluebird'); 

mailStartTemplate = `
Hi {{name}},

This is a mail regarding your Movie Ticket Resale
<br/>
<br/>
Your Transaction Id: <b>{{uniqueId}}<b> 
<br/>
<br/>
Note: Further transaction with us will be done with this Id
<br/>
<br/>
We have found some buyers
<br/>
<br/>
<table style="width:100%; border:1px solid black;">
<thead>
<td style="width:10%;border:1px solid black;"><b>S.No</b></td>
<td style="width:15%;border:1px solid black;"><b>Name</b></td>
<td style="width:20%;border:1px solid black;"><b>Email Id</b></td>
<td style="width:55%;border:1px solid black;"><b>Comment</b></td>
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
                cc: '',
                bcc: ['a.s.arunvignesh@gmail.com'],
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
            mailStartTemplate = mailStartTemplate.replace('{{name}}', document.slot.name || '');
            mailStartTemplate = mailStartTemplate.replace('{{uniqueId}}', document.uniqueId || '');
            var tableBody = result.map((value, index) => '<tr>'
                                    +'<td style="width:10%;border:1px solid black;">'+ (index + 1) +'</td>'
                                    +'<td style="width:15%;border:1px solid black;">'+ value.slot.name +'</td>'
                                    +'<td style="width:20%;border:1px solid black;">'+ value.slot.email +'</td>'
                                    +'<td style="width:55%;border:1px solid black;">'+ value.slot.comments +'</td>'
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