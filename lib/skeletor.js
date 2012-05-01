var fs = require('fs');
var spawn = require('child_process').spawn;
var ejs = require('ejs');
var defaults = {
  npm: {
    author: {
      name: 'YOUR_NAME',
      email: 'you@you.com',
      url: 'http://yourdomain.com',
    },
  },
  github: {
    user: 'YOUR_GITHUB_USERNAME'
  }
};

exports = module.exports = new Skeletor;

function Skeletor() { }

Skeletor.prototype.generate = function(name, callback){
  getDefaults( function() {
    fs.mkdir(name, function(){
      copyFile('.gitignore', name);
      copyFile('.travis.yml', name);
      fs.mkdir(name + '/bin', function(){
        writeTemplate('bin/skeletor.js.ejs', 'bin/' + name +'.js', name, function(){
          fs.mkdir(name + '/lib', function(){
            writeTemplate('lib/skeletor.js.ejs', 'lib/' + name +'.js', name, function(){
              fs.mkdir(name + '/test', function(){
                writeTemplate('test/skeletor.test.js.ejs', 'test/' + name +'.test.js', name, function(){
                  writeTemplate('package.json.ejs', 'package.json', name, function(){
                    writeTemplate('README.md.ejs', 'README.md', name, function(){
                      if (callback && typeof(callback) === "function") {
                        callback();
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};



function writeTemplate(file, target, name, callback){
  fs.readFile( __dirname + '/../src/' + file, 'utf-8', function(err,data){
    if(err) {
      console.error("Could not open file: %s", err);
      process.exit(1);
    } else {
      fs.writeFile( name + "/" + target, ejs.render(data, { name : name, defaults: defaults }), function(err) {
        if(err) {
          console.log(err);
        }
        if (callback && typeof(callback) === "function") {
          callback();
        }
      });
    }
  });
}

function copyFile(file, name) {
  var source = fs.createReadStream( __dirname + '/../src/' + file);
  var target = fs.createWriteStream( name + "/" + file);     
  source.pipe(target);
}

function getDefaults(callback) {
  getAuthorEmail(function() { 
    getAuthorName(function() { 
      getAuthorUrl(function() { 
        getGithubUser(function() { 
          if (callback && typeof(callback) === "function") {
            callback();
          }
        });
      });
    });
  });
}

function getAuthorEmail(callback){
  var npmEmail = spawn('npm', ['config', 'get', 'init.author.email']);
  npmEmail.stdout.setEncoding('utf8');
  npmEmail.stdout.on('data', function (data) {
    if (data){
      defaults.npm.author.email = data.replace(/\n/, "");
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
}

function getAuthorName(callback){
  var npmName = spawn('npm', ['config', 'get', 'init.author.name']);
  npmName.stdout.setEncoding('utf8');
  npmName.stdout.on('data', function (data) {
    if (data){
      defaults.npm.author.name = data.replace(/\n/, "");
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
}

function getAuthorUrl(callback){
  var npmUrl = spawn('npm', ['config', 'get', 'init.author.url']);
  npmUrl.stdout.setEncoding('utf8');
  npmUrl.stdout.on('data', function (data) {
    if (data){
      defaults.npm.author.url = data.replace(/\n/, "");
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
}

function getGithubUser(callback){
  var githubUser = spawn('git', ['config', '--get', 'github.user']);
  githubUser.stdout.setEncoding('utf8');
  githubUser.stdout.on('data', function (data) {
    if (data){
      defaults.github.user = data.replace(/\n/, "");
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
}
