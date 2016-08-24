let fs = require('fs'),
  inquirer = require('inquirer'),
  Q = require('q'),
  questions = require('./questions');


function createFile(name, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(name, data, 'utf-8', function(err) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function createFolder(dir) {

  if (!fs.statSync(dir)){
    return new Promise(function(resolve, reject) {
      fs.mkdir(dir, function(err) {
        if (err) reject(err);
        else resolve(dir);
      });
    });
  }
}

inquirer
  .prompt(questions)
  .then((answers) => Q.all([answers, createFolder(answers.name)]))
  .then((answers) =>
    Q.all([
      createFile(`${answers.name}/${answers.name}Controller.js`, `${answers.name}/${answers.name}Controller.js`),
      createFile(`${answers.name}/${answers.name}Service.js`, `${answers.name}/${answers.name}Service.js`),
      createFile(`${answers.name}/${answers.name}Validator.js`, `${answers.name}/${answers.name}Validator.js`),
      createFile(`${answers.name}/${answers.name}Model.js`, `${answers.name}/${answers.name}Model.js`),
      ])
  )
  .then((results) => console.log('oks'));