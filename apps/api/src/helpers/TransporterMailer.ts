import nodemailer from 'nodemailer';

export const transporterNodemailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'haniefburhan17@gmail.com',
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
