import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    )

    // Esperado que quando executar a função 'execute', passando todos os parâmetros, ele conclua (resolva) e não dispare nenhuma exceção.
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "Example comment",
      screenshot: "image.png"
    })).resolves.not.toThrow();
  })
});