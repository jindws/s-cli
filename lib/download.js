import ora from "ora";
import fs from "fs";
import { promisify } from "util";
import gpoc from "git-pull-or-clone";

const gitPullOrClone = promisify(gpoc);

async function clone(repo, output) {
  const process = ora(`download...${repo}`);
  process.start();
  if (fs.existsSync(`./${output}`)) {
    return process.fail();
  }
  await gitPullOrClone(repo, `./${output}`);
  return process.succeed();
}

export { clone };
