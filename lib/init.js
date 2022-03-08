const { promisify } = require("util");
const figlet = promisify(require("figlet")); //FIGfont
const clear = require("clear");
const chalk = require("chalk"); //颜色
const ora = require("ora");
const { clone } = require("../lib/download");
const cp = require("child_process");
// const open = require('open')

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

module.exports = async (name) => {
  //welcome
  clear();
  const data = await figlet("welcome");
  log(data);
  //download from git
  await clone("https://github.com/moiamoia/s-react.git", name);
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
