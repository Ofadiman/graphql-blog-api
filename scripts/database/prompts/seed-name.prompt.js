const { Input } = require('enquirer')

exports.seedNamePrompt = new Input({
  message: 'Enter the name that will be used to create the file containing the seed database (camel case string).',
  initial: ''
})
