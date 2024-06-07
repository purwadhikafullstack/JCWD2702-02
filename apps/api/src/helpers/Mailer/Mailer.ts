import { transporterNodemailer } from '../../helpers/Mailer/TransporterMailer';
import Handlebars from 'handlebars';
import fs from 'fs';

interface ISendMailParams {
  accesstoken: string;
  username: string;
  email: string;
  link: string;
  subject: string;
}

export const sendMail = async ({
  accesstoken,
  username,
  email,
  link,
  subject,
}: ISendMailParams) => {
  const verificationHTML = fs.readFileSync(
    'src/template/EmailVerification.html',
    'utf-8',
  );

  let verificationHTMLCompiler: any =
    await Handlebars.compile(verificationHTML);

  verificationHTMLCompiler = verificationHTMLCompiler({
    username: username,
    link: `http://localhost:3000/auth/${link}/${accesstoken}`,
  });

  transporterNodemailer.sendMail({
    from: 'Warehouse E-Commerce',
    to: email,
    subject: subject,
    html: verificationHTMLCompiler,
  });
};
