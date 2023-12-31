#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";
import { mkdirSync, appendFile, writeFile } from "fs";
import figlet from "figlet";
import { exec } from "child_process";

import {
  mainMessage,
  readmeContent,
  gitignoreContent,
} from "./content/mainContent.js";

let projectName, lang, readme;

const sleep = (ms = 2700) => new Promise((r) => setTimeout(r, ms));

async function start() {
  const msg = "Gynit";
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
  const spinner = createSpinner("Putting your files together...\n").start();

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
}

// Creating README based on users choice
async function createReadme() {
  var readmeLang;
  if (readme == true) {
    switch (lang) {
      case "Node.js":
        readmeLang = `${readmeContent.Node}`;
        writeFile(`${projectName}/README.md`, `${readmeLang}`, (err) => {
          if (err) {
            throw err;
          }
        });
        break;
      case "Typescript":
        readmeLang = `${readmeContent.Typescript}`;
        writeFile(`${projectName}/README.md`, `${readmeLang}`, (err) => {
          if (err) {
            throw err;
          }
        });
        break;
      case "Bash":
        readmeLang = `${readmeContent.Bash}`;
        writeFile(`${projectName}/README.md`, `${readmeLang}`, (err) => {
          if (err) {
            throw err;
          }
        });
        break;
      case "Go":
        readmeLang = `${readmeContent.Go}`;
        writeFile(`${projectName}/README.md`, `${readmeLang}`, (err) => {
          if (err) {
            throw err;
          }
        });
        break;
      case "Other":
        readmeLang = `${readmeContent.Other}`;
        writeFile(`${projectName}/README.md`, `${readmeLang}`, (err) => {
          if (err) {
            throw err;
          }
        });
        break;

      default:
        writeFile(
          `${projectName}/README.md`,
          `Something went wrong here...`,
          (err) => {
            if (err) {
              throw err;
            }
          },
        );
        break;
    }
  }
}

// create a git repository
async function createGit() {
  var gitIgnoreLang = null;
  exec(`git init ./${projectName}`, (err) => {
    if (err) {
      console.error("Error while creating git repository: ", err);
      return;
    }
  });
  switch (lang) {
    case "Node.js":
      gitIgnoreLang = `${gitignoreContent.Node}`;
      writeFile(`${projectName}/.gitignore`, `${gitIgnoreLang}`, (err) => {
        if (err) {
          throw err;
        }
      });
      break;
    case "Typescript":
      gitIgnoreLang = `${gitignoreContent.Typescript}`;
      writeFile(`${projectName}/.gitignore`, `${gitIgnoreLang}`, (err) => {
        if (err) {
          throw err;
        }
      });
      break;
    case "Bash":
      gitIgnoreLang = `${gitignoreContent.Bash}`;
      writeFile(`${projectName}/.gitignore`, `${gitIgnoreLang}`, (err) => {
        if (err) {
          throw err;
        }
      });
      break;
    case "Go":
      gitIgnoreLang = `${gitignoreContent.Go}`;
      writeFile(`${projectName}/.gitignore`, `${gitIgnoreLang}`, (err) => {
        if (err) {
          throw err;
        }
      });
      break;
    case "Other":
      gitIgnoreLang = `${gitignoreContent.Bash}`;
      writeFile(`${projectName}/.gitignore`, `${gitIgnoreLang}`, (err) => {
        if (err) {
          throw err;
        }
      });
      break;

    default:
      writeFile(
        `${projectName}/.gitignore`,
        `Something went wrong here...`,
        (err) => {
          if (err) {
            throw err;
          }
        },
      );
      break;
  }
}

await start();
await askProjectName();
await askLanguage();
await askReadme();

await createProject();
await createReadme();
await createGit();
