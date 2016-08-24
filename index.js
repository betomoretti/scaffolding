let fs = require('fs'),
  inquirer = require('inquirer'),
  Q = require('q'),
  questions = require('./questions'),
  writeFile = Q.denodeify(fs.writeFile),
  mkdir = Q.denodeify(fs.mkdir);

let promise = inquirer
  .prompt(questions)
  .then((answers) => Q.all([answers, mkdir(answers.name)]));

Q(promise)
  .spread((answers) =>
    Q.all([
      writeFile(`${answers.name}/${answers.name}Controller.js`, `${answers.name}/${answers.name}Controller.js`),
      writeFile(`${answers.name}/${answers.name}Service.js`, `${answers.name}/${answers.name}Service.js`),
      writeFile(`${answers.name}/${answers.name}Validator.js`, `${answers.name}/${answers.name}Validator.js`),
      writeFile(`${answers.name}/${answers.name}Model.js`, `${answers.name}/${answers.name}Model.js`),
      ])
  )
  .then((results) => console.log('oks'))
  .catch(console.log);