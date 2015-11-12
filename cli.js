#!/usr/bin/env node
'use strict';

var meow = require('meow');
var chalk = require('chalk');
var direction = require('./');
var options = {};

var cli = meow('Usage \n $ direction <origin> <destination> \n\nExamples \n $ direction "bukit damansara" "klcc" \n');

if (cli.input.length === 0 || cli.input.length < 2) {
  console.log(cli.help);
  process.exit(0);
}

if (cli.input[0]) {
  options.origin = cli.input.shift();
}

if (cli.input[0]) {
  options.destination = cli.input.shift();
}

direction(options)
  .then(function(result) {
    if (!result) {
      console.log(chalk.bold('result not found'));
    } else {
      console.log(chalk.underline.bold('Route'));
      console.log(chalk.bold(result.start) + ' → ' + chalk.bold(result.end));
      console.log(chalk.underline.bold('Duration'));
      console.log(chalk.green(result.duration));
      console.log(chalk.underline.bold('Routes'));
      result.routes.forEach(function(route) {
        console.log(chalk.green(route));
      });
    }
    process.exit(0);
  })
  .catch(function(err) {
    console.error(chalk.red.bold(err.message));
    process.exit(1);
  });
