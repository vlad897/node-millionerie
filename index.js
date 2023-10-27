import path from "node:path";
import fs from "node:fs/promises";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionsFilePath = path.resolve("questions.json");

let countOfRightAnswers = 0;

const askQuestion = (data) => {
  return new Promise((res) => {
    rl.question(data.question + "\n" + data.answers.map((el, i) => `${++i}. ${el}`).join("\n") + "\n", (answer) => {
      if (++data.correctAnswer === +answer) {
        countOfRightAnswers += 1;
      }
      res();
    });
  });
};

const start = async () => {
  const dataJSON = await fs.readFile(questionsFilePath, "utf-8");
  const questions = JSON.parse(dataJSON).questions;

  for (let i = 0; i < questions.length; i++) {
    await askQuestion(questions[i]);
  }
  console.log("Count of right answers " + countOfRightAnswers);
  rl.close();
};

start();
