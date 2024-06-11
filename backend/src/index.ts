// src/index.js (handler)
import express from "express";
import dotenv from "dotenv";
import {
  getAllQuestionaires,
  saveQuestionnaire,
} from "./controllers/questionnaire.js";
import { validateReqBody } from "./validation.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/questionnaires", async (req, res) => {
  try {
    validateReqBody(req.body);
    saveQuestionnaire(req.body);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send("failed to save questionaire");
    return;
  }
  res.status(204);
  res.send("");
});

app.get("/questionnaires", async (req, res) => {
  try {
    const data = await getAllQuestionaires(req.body);
    res.send(data);
  } catch (e) {
    res.status(500);
    res.send("could not retrieve questionaires");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
