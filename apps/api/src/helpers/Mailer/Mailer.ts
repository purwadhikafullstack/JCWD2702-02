import { transporterNodemailer } from '../../helpers/Mailer/TransporterMailer';
import fs from 'fs';

interface ISendMailParams {
  accesstoken: string;
  username: string;
  email: string;
}

export const sendMail = async ({
  accesstoken,
  username,
  email,
}: ISendMailParams) => {
  const verificationHTML = fs.readFileSync(
    'src/template/EmailVerification.html',
    'utf-8',
  );

  let verificationHTMLCompiler: any =
    await Handlebars.compile(verificationHTML);

  verificationHTMLCompiler = verificationHTMLCompiler({
    username: username,
    link: `http://localhost:3000/auth/verification/${accesstoken}`,
  });

  transporterNodemailer.sendMail({
    from: 'Warehouse E-Commerce',
    to: email,
    subject: 'Reset Password',
    html: verificationHTMLCompiler,
  });
};
