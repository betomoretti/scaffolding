let _ = require('lodash');

module.exports = {
  controller (options) {
    return 'module.exports =\n\n' +
      `class ${_.capitalize(options.name)}Controller {\n` +
        '  get(command, req, res) {\n  }\n' +
        '  list(command, req, res) {\n  }\n' +
        '  update(command, req, res) {\n  }\n' +
        '  create(command, req, res) {\n  }\n' +
        '  delete(command, req, res) {\n  }\n' +
      '}';
  },
  index () {},
  model () {},
  service () {},
  validator () {}
};