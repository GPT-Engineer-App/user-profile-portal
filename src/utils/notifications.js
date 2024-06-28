import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

sgMail.setApiKey(sendgridApiKey);
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

export const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: 'your-email@example.com', // Use your verified sender
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body : error.message);
  }
};

export const sendSMS = async (to, body) => {
  try {
    await twilioClient.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    });
    console.log('SMS sent');
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.body : error.message);
  }
};