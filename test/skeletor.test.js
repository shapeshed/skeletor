var assert = require('assert');
var skeletor = require('../lib/skeletor');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

describe('Running skeletor', function(){

  before(function(done){
    process.chdir('/tmp');
    skeletor.generate('foobar', done);
  })
   
  it('should create a directory for the module', function(){
    assert.ok(fs.existsSync('foobar'));
  });

  it('should create a bin folder within the module', function(){
    assert.ok(fs.existsSync('foobar/bin'));
  });

  it('should create a lib folder within the module', function(){
    assert.ok(fs.existsSync('foobar/lib'));
  });

  it('should create a package.json within the module', function(){
    assert.ok(fs.existsSync('foobar/package.json'));
  });

  it('should create a README.md within the module', function(){
    assert.ok(fs.existsSync('foobar/README.md'));
  });

  it('should create a test folder within the module', function(){
    assert.ok(fs.existsSync('foobar/test'));
  });

  after(function(done){
    rimraf('/tmp/foobar', function(err){
      done();
    })
  })

}); 
