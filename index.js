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

// function createFolder(name, data) {
//   return new Promise(function(resolve, reject) {
//     fs.writeFile(name, data, 'utf-8', function(err) {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// }

inquirer
  .prompt(questions)
  // .then((answers) => [answers, createFolder(answers.name)])
  .then((answers) =>
    Q.all([
      createFile(`${answers.name}Controller.js`, `${answers.name}Controller.js`),
      createFile(`${answers.name}Service.js`, `${answers.name}Service.js`),
      createFile(`${answers.name}Validator.js`, `${answers.name}Validator.js`),
      createFile(`${answers.name}Model.js`, `${answers.name}Model.js`),
      ])
  )
  .then((results) => console.log('oks'));