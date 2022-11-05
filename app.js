const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is a message that I want to send over WhatsApp with Twilio!',
     from: 'whatsapp:+14155238886',
     to: 'whatsapp:+15005550006'
   })
  .then(message => console.log(message.sid));
