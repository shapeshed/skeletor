# Skeletor

[![Build Status](https://secure.travis-ci.org/shapeshed/skeletor.png)](http://travis-ci.org/shapeshed/skeletor)

Skeletor is a cli tool for generating an opitionated blueprint for a Node.js module. It assumes you are using the following:

* [Mocha][1] for testing
* [GitHub][2] for source control
* [Travis][3] for CI

Skeltor will generate the following layout
  .
  ├── bin
  │   └── module_name.js
  ├── .gitignore
  ├── lib
  │   └── module_name.js
  ├── Makefile
  ├── package.json
  ├── README.md
  ├── test
  │   └── module_name.test.js
  └── .travis.yml

Don't like the layout? Create your own fork and change to your liking.

# Installation

    npm -g install skeletor

# Default values

Skeletor will try and read defaults to populate the package.json file from your `.npmrc` and `.gitconfig` files. 

.gitconfig

  [github]
      user = shapeshed

.npmrc

  init.author.name = George Ornbo
  init.author.url = http://shapeshed.com
  init.author.email = george@shapeshed.com

# Usage

    skeletor [module_name]
    cd [module_name]
    npm install
    make test

Then you can start hacking on your module, create a GitHub repo and push it up. 

[1]: http://visionmedia.github.com/mocha/
[2]: http://github.com
[3]: http://travis-ci.org
