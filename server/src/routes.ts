import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCase';

const routes = express.Router();

// endpoint cadastro de feedbacks e envio de email
routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailerAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerAdapter);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).send();
});

export default routes;