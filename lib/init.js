import chalk from "chalk"; //颜色
import ora from "ora";
import cp from "child_process";
import clear from "clear";
import { promisify } from "util";
import _figlet from "figlet";

const figlet = promisify(_figlet); //FIGfont
import { clone } from "./download.js";

const log = (content) => console.log(chalk.yellow(content));

function spawn(...args) {
  const { spawn } = cp;
  return new Promise((resolve) => {
    const _process = spawn(...args);
    _process.stdout.pipe(process.stdout);
    _process.stderr.pipe(process.stderr);
    _process.on("close", () => resolve());
  });
}

export default async (name) => {
  //welcome
  clear();
  const data = await figlet("welcome");
  log(data);
  //download from git
  await clone("https://github.com/jindws/s-react.git", name);
  //npm install
  const process = ora(`install packages`);
  process.start();
  await spawn("tyarn", ["install"], {
    cwd: `./${name}`,
  });
  process.succeed();

  // open('http://localhost:8080')
  await spawn("npm", ["run", "start"], {
    cwd: `./${name}`,
  });
};
