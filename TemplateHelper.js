let _ = require('lodash');

const types = {
  'string': 'Sequelize.STRING',
  'number': 'Sequelize.INTEGER'
};

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

  index (options) {
    let name = options.name,
      capitalizedName = _.capitalize(options.name);

    return "let restlib = require('rest-lib'),\n" +
      "  ioc = require('ioc');\n" +
      'module.exports = ioc\n' +
      '  .module([restlib.core, restlib.model])\n' +
      `  .controller('${name}Controller', {\n` +
      `    'class': require('./${capitalizedName}Controller'),\n` +
      `    'context': '/${name}',\n` +
      `    'validator': require('./${capitalizedName}Validator'),\n` +
      `    'service': ioc.ref('${name}Service')\n` +
      '  })\n' +
      `  .controller('${name}Service', {\n` +
      `    'class': require('./${capitalizedName}Service'),\n` +
      `    'model': ioc.ref('${name}Model')\n` +
      '  })\n' +
      `  .model('${name}Model', {\n` +
      `    'class': require('./${capitalizedName}Model')\n` +
      '  });\n'
  },

  model (options) {
    let template = 'let Sequelize = require(\'sequelize\');\n\n' +
      'module.exports = {\n\n' +
      `  modelName: '${_.capitalize(options.name)}',\n` +
      '  attributes: {\n';

    _.each(options.attr, (attribute, index) => {
      let valueProperty = attribute.split(':');
      if (index !== options.attr.length - 1) {
        template += `    ${valueProperty[0]}: ${types[valueProperty[1]]},\n`;
      } else {
        template += `    ${valueProperty[0]}: ${types[valueProperty[1]]}\n`;
      }
    });

    template += '  },\n' +
      '  options: {\n' +
      '    timestamps: true,\n' +
      '    paranoid: true,\n' +
      '    classMethods () {},\n' +
      '    instanceMethods () {}\n' +
      '  },\n' +
      '  afterDefined (models) {}\n' +
      '};';

    return template;
  },

  service (options) {
    let name = options.name;

    return 'module.exports =\n\n' +
      `class ${_.capitalize(name)}Service {\n` +
      '  get (id) {\n' +
      '    return this.model.findById(id);\n' +
      '  }\n' +
      '  list () {\n' +
      '    return this.model.findAll();\n' +
      '  }\n' +
      `  create (${name}) {\n` +
      `    return this.model.create(${name});\n` +
      '  }\n' +
      `  update (${name}) {\n` +
      `    return this.model.update(${name}, {\'where\': {\'id\': ${name}.id}});\n` +
      '  }\n' +
      `  delete (id) {\n` +
      '    return this.model.destroy({\'where\': {\'id\': id}});\n' +
      '  }\n' +
      '}';
    },

  validator (options) {
    let template =
      "let Joi = require('joi');\n" +
      "module.exports = {\n\n" +
      "  'get': {\n" +
      "    'params': {\n" +
      "      id: Joi.number().required()\n" +
      "    }\n" +
      "  },\n" +
      "  'create': {\n" +
      "    params: {\n" +
      "      id: Joi.number().required()\n" +
      "    },\n" +
      "    body: {\n";

    _.each(options.attr, (attr, index) => {
      let valueProperty = attr.split(':');
      if (index !== options.attr.length - 1) {
        template += `      ${valueProperty[0]}: Joi.${valueProperty[1]}(),\n`;
      } else {
        template += `      ${valueProperty[0]}: Joi.${valueProperty[1]}()\n`;
      }
    });

    template += '    },\n' +
      '  },\n' +
      "  'update': {\n" +
      "    params: {\n" +
      "      id: Joi.number().required()\n" +
      "    },\n" +
      "    body: {\n";

    _.each(options.attr, (attr, index) => {
      let valueProperty = attr.split(':');
      if (index !== options.attr.length - 1) {
        template += `      ${valueProperty[0]}: Joi.${valueProperty[1]}(),\n`;
      } else {
        template += `      ${valueProperty[0]}: Joi.${valueProperty[1]}()\n`;
      }
    });

    template += '    },\n' +
      '  },\n' +
      "  'delete': {\n" +
      "    params: {\n" +
      "      id: Joi.number().required()\n" +
      "    }\n" +
      "  }\n" +
      "};\n"

    return template;
  }
};
