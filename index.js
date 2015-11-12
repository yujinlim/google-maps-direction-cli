'use strict';

var direction = require('google-maps-direction');
var striptags = require('striptags');
var assert = require('assert');

function getRoutes(steps) {
  assert(Array.isArray(steps), 'wrong type passed on routes');

  steps = steps.map(function(step) {
    var route = striptags(step.html_instructions) + ' (' + step.distance.text + ')';
    return route;
  });

  return steps;
}

module.exports = function(options) {
  return direction(options)
    .then(function(result) {
      var response = {};
      var route = result.routes.shift();

      if (!route) return null;

      var leg = route.legs.shift();
      if (!leg) return null;

      response.duration = leg.duration.text;
      response.start    = leg.start_address;
      response.end      = leg.end_address;
      response.routes   = getRoutes(leg.steps);

      return response;
    });
};
