#!/usr/bin/env node

// var exec = require('child_process').exec;
var exec = require('child_process').spawn;
var path = require('path');
var appRoot = require('app-root-dir').get();
var program = require('commander');
var child, configPath;

var restFlowCommand = '/usr/bin/java -jar ' + path.resolve(__dirname, '../lib/restflow.jar');

program
  .version('0.0.1')
  .usage('[options] <DIR>')
  .option('-c, --config <path>', 'Path to the config folder', handlePathConfiguration)
  .parse(process.argv);


function handlePathConfiguration(directory) {

  configPath = appRoot + '/' + directory;
  restFlowCommand +=  ' -config ' + path.resolve(directory) ;

  console.log('Resolve Path',  path.resolve(directory) );
  console.log('Path config', configPath);
  console.log('Final Command', restFlowCommand);

  child = exec(restFlowCommand,
    function (error, stdout, stderr){
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);

      if(error !== null){
        console.log('exec error: ' + error);
      }
  });


  child.stdout.on('data', function(data) {
      console.log('[RESTFLOW] ', data.toString());
  });

  child.stderr.on('data', function(data) {
      console.log('[RESTFLOW-ERR]' + data);
  });

  child.on('close', function(code) {
      console.log('[CLOSING] RestFlow: ' + code);
  });

}

// java -jar /usr/local/lib/node_modules/npm-restflow/lib/restflow.jar -config /Users/alfredo/Developer/underpinning-sales/src/server/config


// http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn

// child.stdout.on('data', function(data) {
//     console.log('stdout: ' + data);
// });
