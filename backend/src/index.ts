// src/index.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Serverr");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
