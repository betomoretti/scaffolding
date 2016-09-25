let fs = require('fs'),
  inquirer = require('inquirer'),
  Q = require('q'),
  questions = require('./questions'),
  _ = require('lodash'),
  writeFile = Q.denodeify(fs.writeFile),
  mkdir = Q.denodeify(fs.mkdir),
  TemplateHelper = require('./TemplateHelper'),
  attributes = [];

let ask = () => {
  return inquirer.prompt(questions.attributes)
    .then((answers) => {
      attributes.push(answers.attribute);
      if (answers.askAgain) {
        return ask();
      } else {
        return attributes;
      }
    });
}

let questionProm = inquirer.prompt(questions.name)
  .then((answers) => [answers.name, ask()]);

let mkdirProm = Q(questionProm)
  .spread((name, attributes) => Q.all([{'name': name, 'attr': attributes}, mkdir(name)]));

Q(mkdirProm)
  .spread((answers) =>
    Q.all([
      answers,
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Controller.js`, TemplateHelper.controller(answers)),
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Service.js`, TemplateHelper.service(answers)),
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Validator.js`, TemplateHelper.validator(answers)),
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Model.js`, TemplateHelper.model(answers)),
      writeFile(`${answers.name}/index.js`, TemplateHelper.index(answers)),
    ])
)
  .spread((answers) => answers)
  .catch(console.log);

