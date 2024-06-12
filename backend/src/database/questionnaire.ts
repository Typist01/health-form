import { QuestionnaireDb } from "../models/questionnaire.js";
import prisma from "../utils/prisma";

export const createQuestionnaire = async (questionnaire: QuestionnaireDb) => {
  try {
    await prisma.questionnaire.create({
      data: {
        name: questionnaire.name,
        age: questionnaire.age,
        gender: questionnaire.gender,
        healthCondition: questionnaire.healthCondition,
        symptomsExperienced: questionnaire.symptomsExperienced,
        symptoms: questionnaire.symptoms ?? "",
      },
    });
  } catch (e) {
    throw new Error("inserting questionnaire into db");
  }
};

export const getAllQuestionaires = async () => {
  try {
    const data = await prisma.questionnaire.findMany();
    return data;
  } catch (e) {
    throw new Error("getting questionaires from db");
  }
};
