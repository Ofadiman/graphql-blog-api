const { Input } = require('enquirer')

exports.migrationNamePrompt = new Input({
  message: 'Enter the migration name (camel case string)',
  initial: ''
})
