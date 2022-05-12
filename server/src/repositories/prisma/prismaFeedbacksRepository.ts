import { prisma } from "../../prisma";
import { feedbackCreateData, FeedbacksRepositoryInterface } from "../feedbacksRepositoryInterface";

export class PrismaFeedbacksRepository implements FeedbacksRepositoryInterface {
  async create({type, comment, screenshot}: feedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  };
}