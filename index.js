import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { existsSync, writeFile, copyFile } from "fs";
import { type } from "os";

let projectName, lang, readme;

const sleep = (ms = 3500) => new Promise((r) => setTimeout(r, ms));

async function start() {
  const tittle = chalkAnimation.neon("\nGinit");
  await sleep();

  console.log(`
${chalk.magenta("How to use: ")}
You will be asked about this project, and based 
on these responses, a README will be generated.
`);
  tittle.stop();
}

async function verifyGit() {
  if (existsSync(".git")) {
    console.log("Already a git repository.");
    process.exit(1);
  } else {
    await start();
  }
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
      "Node.js",
      "Typescript",
      "Bash",
      "Go",
      new inquirer.Separator(),
      "Other",
    ],
  });
  lang = answer.language;
}

async function askReadme() {
  const answer = await inquirer.prompt({
    name: "readme",
    type: "confirm",
    message: "Would you like to create a README.md?",
  });
  readme = answer.readme;
  if (readme == true) {
    copyFile(`./content/${lang}-readme.md`, "README.md", (err) => {
      if (err) {
        console.log("Error while creating README: ", err);
      } else {
        console.log("README created.");
      }
    });
  } else {
    console.log("next step");
  }
}

// await verifyGit();
await start();
// await askProjectName();
await askLanguage();
await askReadme();
