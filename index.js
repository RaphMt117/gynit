import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { existsSync } from "fs";

let projectName, lang;

const sleep = (ms = 3500) => new Promise((r) => setTimeout(r, ms));

async function verifyGit() {
  if (existsSync(".git")) {
    console.log("Already a git repository.");
    process.exit(1);
  } else {
    await start();
  }
}

async function start() {
  const tittle = chalkAnimation.neon("Ginit");
  await sleep();

  console.log(`
${chalk.magenta("How to use: ")}
You will be asked about this project, and based 
on these responses, a README will be generated.
`);
  tittle.stop();
}

async function askProjectName() {
  const answer = await inquirer.prompt({
    name: "project_name",
    type: "input",
    message: "What is the project name?",
    default() {
      return "unnamed-project";
    },
  });
  projectName = answer.project_name;
}

async function askLanguage() {
  const answer = await inquirer.prompt({
    name: "language",
    type: "list",
    message: "What language will be used in this project?",
    choices: [
      "Javascript",
      "Typescript",
      "Bash",
      "Go",
      new inquirer.Separator(),
      "Other",
    ],
  });
  lang = answer.language;
}

// await verifyGit();
await start();
await askProjectName();
await askLanguage();
