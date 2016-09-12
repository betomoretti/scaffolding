let _ = require('lodash');

module.exports = {
  controller (options) {
    return 'module.exports =\n\n' +
      `class ${_.capitalize(options.name)}Controller {\n` +
        '  get (command) {\n' +
        '    return this.service.create(command.id);\n' +
        '  }\n' +
        '  list () {\n' +
        '    return this.service.list();\n' +
        '  }\n' +
        '  create (command) {\n' +
        '    return this.service.create(command);\n' +
        '  }\n' +
        '  update (command) {\n' +
        '    return this.service.update(command);\n' +
        '  }\n' +
        '  delete (command) {\n' +
        '    return this.service.delete(command.id);\n' +
        '  }\n' +
      '}';
  },
  index () {},
  model (answers) {
    console.log(answers);
  },
  service (options) {
    return 'module.exports =\n\n' +
      `class ${_.capitalize(options.name)}Service {\n` +
      '  get (id) {\n' +
      '    return this.model.findById(id);\n' +
      '  }\n' +
      '  list () {\n' +
      '    return this.model.findAll();\n' +
      '  }\n' +
      `  create (${options.name}) {\n` +
      `    return this.model.create(${options.name});\n` +
      '  }\n' +
      `  update (${options.name}) {\n` +
      `    return this.model.update(${options.name}, {\'where\': {\'id\': ${options.name}.id}});\n` +
      '  }\n' +
      `  delete (id) {\n` +
      '    return this.model.destroy({\'where\': {\'id\': id}});\n' +
      '  }\n' +
      '}';
    },
  validator () {}
};