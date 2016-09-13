module.exports =

{
  'name': [{
    'message': 'What\'s model name?',
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
    'message': 'Want to enter another attribute (just hit enter for YES)?',
    'name': 'askAgain',
    'type': 'confirm'
  }]
};