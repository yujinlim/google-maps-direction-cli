#!/usr/bin/env node
'use strict';

var meow = require('meow');
var chalk = require('chalk');
var direction = require('./');
var options = {
  key: process.env.DIRECTION_API_KEY
};

var cli = meow('Usage \n $ direction <origin> <destination> \n\nOptions \n $ -k, --key Include api key for better traffic forecast (or DIRECTION_API_KEY environment variable) \n\nExamples \n $ direction "bukit damansara" "klcc" \n $ DIRECTION_API_KEY=API_KEY direction "bukit damansara" "klcc" \n $ direction "bukit damansara" "klcc" -k API_KEY', {
  alias: {
    k: 'key'
  }
});

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

if (cli.flags.key) {
  var key = cli.flags.key
  if (typeof(key) !== 'string') {
    console.error(chalk.red.bold('api key is wrong type'));
  }
  options.key = key;
}

if (options.key) {
  options.departure_time = 'now';
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
