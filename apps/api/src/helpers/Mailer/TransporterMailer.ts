import nodemailer from 'nodemailer';

export const transporterNodemailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'warehouse.binasarana@gmail.com',
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
