import { Gender, HealthCondition } from "@prisma/client";

export interface Questionnaire {
  id?: number;
  name: string;
  age: number;
  gender: string;
  healthCondition: string;
  symptomsExperienced?: boolean;
  symptoms?: string;
}

export interface QuestionnaireDb {
  id?: number;
  name: string;
  age: number;
  gender: Gender;
  healthCondition: HealthCondition;
  symptomsExperienced?: boolean;
  symptoms?: string;
}
