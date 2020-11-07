const { createTransport } = require('nodemailer');
const Boom = require('@hapi/boom');

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const handleMsg = (email, url) => ({
  from: `"Chat app" <${process.env.EMAIL}>`,
  to: email,
  subject: 'Confirm your account at chat app',
  html: `
    <h1>Confirm email</h1>
    <p>Please click on this Link to confirm your account <a href=${url}>Confirm now</a></p>
    `,
});

exports.sendMail = (email, url) => {
  const msg = handleMsg(email, url);
  transporter.sendMail(msg).catch((error) => {
    throw Boom.badRequest(error);
  });
};
