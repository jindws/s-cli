#!/usr/bin/env node
const program = require("commander");
const init = require("../lib/init");
const refresh = require("../lib/refresh");

program.version(require("../package.json").version);

program.command("init <name>").description("init project").action(init);

program.command("refresh").description("refresh").action(refresh);

/**
 * process执行的进程,
 * argv 执行的参数
 */
program.parse(process.argv);
