import { app } from "../..";
import request from "supertest";
import prisma from "../../utils/prisma";
import { Gender, HealthCondition } from "@prisma/client";

const agent = request.agent(app);

describe("POST to /questionnaires", function () {
  it("returns 204 when all fields are present", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        age: 87,
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
        symptomsExperienced: true,
        symptoms: "This is a supertest dataset for an api test",
      })
      .expect(204);
  });

  it("returns 204 when symptoms is absent", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        age: 87,
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
        symptomsExperienced: true,
      })
      .expect(204);
  });
  it("returns 204 when symptomsExperienced is false", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        age: 87,
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
        symptomsExperienced: false,
      })
      .expect(204);
  });
  it("returns 204 when symptomsExperienced is missing", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        age: 87,
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
      })
      .expect(204);
  });

  it("returns 500 when healthCondition is missing", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        age: 87,
        gender: Gender.Not_specified,
      })
      .expect(500);
  });

  it("returns 500 when gender is missing", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        age: 87,
        healthCondition: HealthCondition.Chronic_illness,
      })
      .expect(500);
  });

  it("returns 500 when age is missing", async () => {
    await agent
      .post("/questionnaires")
      .send({
        name: "supertest-user-1",
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
      })
      .expect(500);
  });

  it("returns 500 when name is missing", async () => {
    await agent
      .post("/questionnaires")
      .send({
        age: 87,
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
      })
      .expect(500);
  });
});

describe("GET to /questionnaires", function () {
  it("should return the new entry in the db", async () => {
    // make sure the db is running for this integration test
    await prisma.questionnaire.create({
      data: {
        name: "supertest-user-1",
        age: 87,
        gender: Gender.Not_specified,
        healthCondition: HealthCondition.Chronic_illness,
        symptomsExperienced: true,
        symptoms: "This is a supertest dataset for /questionnaires",
      },
    });

    const resp = await agent.get("/questionnaires").expect(200);
    const data = resp.body;

    if (Array.isArray(data)) {
      const idx = data.findIndex(
        (x) =>
          x["symptoms"] === "This is a supertest dataset for /questionnaires"
      );
      expect(idx).not.toBe(-1);
    }
  });
});
