import { Gender, HealthCondition } from "@prisma/client";
import { validateReqBody } from "../validation";

// validation.test.ts
describe("validateReqBody", () => {
  test("should throw error if name is not present", () => {
    expect(() => validateReqBody({ age: 25, gender: Gender.Male })).toThrow(
      "name is not present"
    );
  });

  test("should throw error if age is not present", () => {
    expect(() =>
      validateReqBody({ name: "John", gender: Gender.Male })
    ).toThrow("age is not present");
  });

  test("should throw error if age is negative", () => {
    expect(() =>
      validateReqBody({ name: "John", age: -1, gender: Gender.Male })
    ).toThrow("age must not be negative");
  });

  test("should throw error if gender is not present", () => {
    expect(() => validateReqBody({ name: "John", age: 25 })).toThrow(
      "gender is not present"
    );
  });

  test("should throw error if gender is invalid", () => {
    expect(() =>
      validateReqBody({ name: "John", age: 25, gender: "Invalid" })
    ).toThrow("validating gender");
  });

  test("should throw error if healthCondition is invalid", () => {
    expect(() =>
      validateReqBody({
        name: "John",
        age: 25,
        gender: Gender.Male,
        healthCondition: "Invalid",
      })
    ).toThrow("validating healthCondition");
  });

  test("should not throw error for a valid body without healthCondition", () => {
    expect(() =>
      validateReqBody({ name: "John", age: 25, gender: Gender.Male })
    ).not.toThrow();
  });

  test("should not throw error for a valid body with healthCondition", () => {
    expect(() =>
      validateReqBody({
        name: "John",
        age: 25,
        gender: Gender.Male,
        healthCondition: HealthCondition.Healthy,
      })
    ).not.toThrow();
  });
});
