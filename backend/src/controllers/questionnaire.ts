import { Questionnaire, QuestionnaireDb } from "../models/questionnaire";
import * as db from "../database/questionnaire";
export const saveQuestionnaire = async (questionnaire: Questionnaire) => {
  try {
    if (
      questionnaire.gender !== "Male" &&
      questionnaire.gender !== "Female" &&
      questionnaire.gender !== "Not_specified"
    ) {
      throw new Error("validating gender");
    }
    if (
      questionnaire.healthCondition !== "Healthy" &&
      questionnaire.healthCondition !== "Minor_illness" &&
      questionnaire.healthCondition !== "Chronic_illness"
    ) {
      throw new Error("validating healthCondition");
    }

    const dbQuestionnaire: QuestionnaireDb = {
      name: questionnaire.name,
      age: questionnaire.age,
      gender: questionnaire.gender,
      healthCondition: questionnaire.healthCondition,
      symptomsExperienced: questionnaire.symptomsExperienced,
      symptoms: questionnaire.symptoms,
    };

    db.createQuestionnaire(dbQuestionnaire);
  } catch (e) {
    throw new Error("Submitting questionnaire");
  }
};

export const getAllQuestionaires = async (questionnaire: Questionnaire) => {
  try {
    const questionaires = db.getAllQuestionaires();
    return questionaires;
  } catch (e) {
    throw new Error("Getting questionnaire");
  }
};
