const { AutoComplete } = require(`enquirer`)
const { DATABASE_ACTIONS } = require('../main.constants')

exports.actionPrompt = new AutoComplete({
  choices: Object.values(DATABASE_ACTIONS).sort((first, second) => first.localeCompare(second)),
  initial: 0,
  message: `Select the action you want to perform.`,
  name: `Test`
})
