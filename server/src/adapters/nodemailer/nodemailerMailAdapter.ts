import { MailAdapterInterface, SendMailData } from "../mailAdapterInterface";
import nodemailer from 'nodemailer';

// config server email
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0a0d5989716f33",
    pass: "7159a4b9706ae1"
  }
});

export class NodemailerMailAdapter implements MailAdapterInterface {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Eleson Souza <elesonsouza17@hotmail.com>",
      subject,
      html: body
    });
  }
}