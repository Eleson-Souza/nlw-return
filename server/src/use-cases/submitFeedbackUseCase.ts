import { MailAdapterInterface } from "../adapters/mailAdapterInterface";
import { FeedbacksRepositoryInterface } from "../repositories/feedbacksRepositoryInterface";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepositoryInterface,
    private mailAdapter: MailAdapterInterface
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111"`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}" alt="Print de tela" />`,
        `</div>`
      ].join('\n'),
    })
  }
}