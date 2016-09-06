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
  inquirer.prompt(questions.attributes).then((answers) => {
    attributes.push(answers.attribute);
    if (answers.askAgain) {
      ask();
    } else {
      return attributes;
    }
  });
}

let promise = inquirer
  .prompt(questions.name)
  .then((answers) => Q.all([answers.name, ask()]))
  .spread((name, attributes) => Q.all([{'name': name, 'attr': attributes}, mkdir(name)]));

Q(promise)
  .spread((answers) =>
    Q.all([
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Controller.js`, TemplateHelper.controller(answers)),
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Service.js`, TemplateHelper.service(answers)),
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Validator.js`, TemplateHelper.controller(answers)),
      writeFile(`${answers.name}/${_.capitalize(answers.name)}Model.js`, TemplateHelper.controller(answers)),
      writeFile(`${answers.name}/index.js`, TemplateHelper.controller(answers)),
    ])
)
  .then((results) => console.log('oks'))
  .catch(console.log);


