import { Twilio } from 'twilio';
import { devConfig } from '../config/config';
if (devConfig.accountSid && devConfig.authToken && devConfig.myNumber && devConfig.twilioNumber) {
    const client = new Twilio(devConfig.accountSid, devConfig.authToken);

    client.messages
        .create({
            from: devConfig.twilioNumber,
            to: devConfig.myNumber,
            body: 'You just sent an SMS from TypeScript using Twilio!'
        })
        .then((message) => console.log(message.sid));
} else {
    console.error('You are missing one of the variables you need to send a message');
}
