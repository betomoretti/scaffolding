module.exports =

{
  'all': [{
    'message': 'Insert everything',
    'name': 'all',
    'type': 'input'
  }],
  'name': [{
    'message': 'Enter a name for this model:',
    'name': 'name',
    'type': 'input'
  }],
  'attributes': [{
    'message': 'Define attibutes for the model:\n' +
      'The format must be like attr:type, for example: name:string\n' +
      '(You can find the different types in http://docs.sequelizejs.com/en/v3/api/datatypes/)\n',
    'name': 'attribute',
    'type': 'input'
  }, {
    'default': true,
    'message': 'Do you want to add another attribute? [Y/n]',
    'name': 'askAgain',
    'type': 'confirm'
  }]
};
