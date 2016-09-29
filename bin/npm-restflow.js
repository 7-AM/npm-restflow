#!/usr/bin/env node

var exec = require('child_process').exec;
var path = require('path');
var appRoot = require('app-root-dir').get();
var child;

console.log(appRoot)

// console.log('PATH: ', path.resolve(__dirname, 'lib/restflow') );

child = exec('/usr/bin/java -jar ' + path.resolve(__dirname, 'lib/restflow') + '',
  function (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
      console.log('exec error: ' + error);
    }
});
