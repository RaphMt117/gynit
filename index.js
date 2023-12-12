import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";
import { mkdirSync, copyFile, appendFile } from "fs";
import figlet from "figlet";

import { mainMessage } from "./content/files/mainFiles.js";

let projectName, lang, readme;

const sleep = (ms = 2700) => new Promise((r) => setTimeout(r, ms));

async function start() {
  const msg = "Ginit";
  figlet(
    msg,
    {
      font: "Bloody",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    (err, data) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      } else {
        console.log(gradient.passion.multiline(data));
      }
    },
  );
  await sleep();
  console.log(`${chalk.magenta("How to use: ")}
Answer the next questions about the
project you are creating, and we will
take care of the rest.
`);
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
}

async function createProject() {
  const spinner = createSpinner("Putting your files together...").start();

  // Creating project folder and main file for each language
  switch (lang) {
    case "Node.js":
      await sleep();
      mkdirSync(`${projectName}`);
      appendFile(`${projectName}/index.js`, `${mainMessage.Node}`, (err) => {
        if (err) {
          throw err;
        }
        spinner.success({
          text: "Project created.",
        });
      });
      break;
    case "Go":
      await sleep();
      mkdirSync(`${projectName}`);
      appendFile(`${projectName}/main.go`, `${mainMessage.Go}`, (err) => {
        if (err) {
          throw err;
        }
        spinner.success({
          text: "Project created.",
        });
      });
      break;
    case "Typescript":
      await sleep();
      mkdirSync(`${projectName}`);
      appendFile(
        `${projectName}/index.ts`,
        `${mainMessage.Typescript}`,
        (err) => {
          if (err) {
            throw err;
          }
          spinner.success({
            text: "Project created.",
          });
        },
      );
      break;
    case "Bash":
      await sleep();
      mkdirSync(`${projectName}`);
      appendFile(`${projectName}/script.sh`, `${mainMessage.Bash}`, (err) => {
        if (err) {
          throw err;
        }
        spinner.success({
          text: "Project created.",
        });
      });
      break;
    case "Other":
      await sleep();
      mkdirSync(`${projectName}`);
      appendFile(`${projectName}/foo.sh`, `${mainMessage.Bash}`, (err) => {
        if (err) {
          throw err;
        }
        spinner.success({
          text: "Project created.",
        });
      });
      break;

    default:
      await sleep();
      mkdirSync(`${projectName}`);
      appendFile(
        `${projectName}/error.md`,
        "Something went wrong here...",
        (err) => {
          if (err) {
            throw err;
          }
          spinner.success({
            text: "Project directory created.",
          });
        },
      );
      break;
  }
  // Creating README based on users choice
  if (readme == true) {
    copyFile(
      `./content/readmes/${lang}-readme.md`,
      `${projectName}/README.md`,
      (err) => {
        if (err) {
          console.log("Error while creating README: ", err);
        } else {
          spinner.success({
            text: "README.md created.",
          });
        }
      },
    );
  }
}

await start();
await askProjectName();
await askLanguage();
await askReadme();

await createProject();
