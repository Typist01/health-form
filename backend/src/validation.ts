import { Gender, HealthCondition } from "@prisma/client";

export const validateReqBody = (body: any) => {
  if (!body.name) {
    throw new Error("name is not present");
  }
  if (!body.age) {
    throw new Error("age is not present");
  }
  if (parseInt(body.age) < 0) {
    throw new Error("age must not be negative");
  }
  if (!body.gender) {
    throw new Error("gender is not present");
  }
  if (
    body.gender !== Gender.Male &&
    body.gender !== Gender.Female &&
    body.gender !== Gender.Not_specified
  ) {
    throw new Error("validating gender");
  }
  if (
    body.healthCondition &&
    body.healthCondition !== HealthCondition.Healthy &&
    body.healthCondition !== HealthCondition.Minor_illness &&
    body.healthCondition !== HealthCondition.Chronic_illness
  ) {
    throw new Error("validating healthCondition");
  }
};
