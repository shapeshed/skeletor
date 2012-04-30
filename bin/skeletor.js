#!/usr/bin/env node
var Skeletor = require("../lib/skeletor")
var args = process.argv.slice(2);

if (args.length === 0){
  console.error('module name is required')
  process.exit(1);
} else {
  Skeletor.generate(args[0]);
}

