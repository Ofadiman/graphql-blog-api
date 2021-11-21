const execa = require('execa')
const { DATABASE_ACTIONS } = require('./main.constants')
const { actionPrompt } = require('./prompts/action.prompt')
const { migrationNamePrompt } = require('./prompts/migration-name.prompt')

const createMigration = async () => {
  const migrationName = await migrationNamePrompt.run()

  execa.commandSync(`yarn knex migrate:make ${migrationName} -x ts`)
}

const runMigrations = async () => {
  execa.commandSync(`yarn knex migrate:latest`)
}

const rollbackLastMigration = async () => {
  execa.commandSync(`yarn knex migrate:rollback`)
}

void (async () => {
  const action = await actionPrompt.run()
  console.info(`Picked action: ${action}.`)

  switch (action) {
    case DATABASE_ACTIONS.MIGRATIONS_CREATE: {
      await createMigration()
      break
    }

    case DATABASE_ACTIONS.MIGRATIONS_RUN_ALL_PENDING: {
      await runMigrations()
      break
    }

    case DATABASE_ACTIONS.MIGRATIONS_ROLLBACK_LAST: {
      await rollbackLastMigration()
      break
    }

    default: {
      throw new Error(`Unsupported action: ${action}!`)
    }
  }
})()
