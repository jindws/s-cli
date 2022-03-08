#!/usr/bin/env node
import "regenerator-runtime/runtime.js";

import { Command } from "commander";

import init from "../lib/init.js";
import refresh from "../lib/refresh.js";

const program = new Command();

program.version(require("../package.json").version);

program.command("init <name>").description("init project").action(init);

program.command("refresh").description("refresh").action(refresh);

/**
 * process执行的进程,
 * argv 执行的参数
 */
program.parse(process.argv);
