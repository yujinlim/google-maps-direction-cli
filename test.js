'use strict';

var test = require('ava');
var proxyquire = require('proxyquire');
var Promise = require('bluebird');

var origin  = 'bukit damansara';
var destination = 'klcc';

test('test empty route', function(t) {
  var mapStub = function() {
    return Promise.resolve({
      routes: []
    });
  };

  var mapDirection = proxyquire('./', {
    'google-maps-direction': mapStub
  });

  mapDirection(origin, destination)
    .then(function(result) {
      t.same(result,  null);
      t.end();
    })
    .catch(function(err) {
      t.fail(err.message);
    });
});

test('test empty leg', function(t) {
  var mapStub = function() {
    return Promise.resolve({
      routes: [{
        legs: []
      }]
    });
  };

  var mapDirection = proxyquire('./', {
    'google-maps-direction': mapStub
  });

  mapDirection(origin, destination)
    .then(function(result) {
      t.same(result,  null);
      t.end();
    })
    .catch(function(err) {
      t.fail(err.message);
    });
});

test('test return expected results', function(t) {
  var mapStub = function() {
    return Promise.resolve({
      routes: [{
        legs: [{
          duration: {
            text: null
          },
          start_address: null,
          end_address: null,
          steps: []
        }]
      }]
    });
  };

  var mapDirection = proxyquire('./', {
    'google-maps-direction': mapStub
  });

  mapDirection(origin, destination)
    .then(function(result) {
      t.true(Array.isArray(result.routes));
      t.same(result.duration, null);
      t.same(result.start, null);
      t.same(result.end, null);
      t.end();
    })
    .catch(function(err) {
      t.fail(err.message);
    });
});
