export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdapterInterface {
  sendMail: (data: SendMailData) => Promise<void>;
}