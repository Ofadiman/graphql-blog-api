const execa = require('execa')
const { DATABASE_ACTIONS } = require('./main.constants')
const { actionPrompt } = require('./prompts/action.prompt')
const { migrationNamePrompt } = require('./prompts/migration-name.prompt')

const generateMigrations = async () => {
  const migrationName = await migrationNamePrompt.run()

  execa.commandSync(`yarn knex migrate:make ${migrationName} -x ts`)
}

const runMigrations = async () => {
  execa.commandSync(`yarn knex migrate:latest`)
}

const rollbackLastMigration = async () => {
  execa.commandSync(`yarn knex migrate:rollback`)
}

const seedDatabase = async () => {
  execa.commandSync(`yarn knex seed:run`)
}

void (async () => {
  const action = await actionPrompt.run()
  console.info(`Picked action: ${action}.`)

  switch (action) {
    case DATABASE_ACTIONS.GENERATE_MIGRATIONS: {
      await generateMigrations()
      break
    }

    case DATABASE_ACTIONS.RUN_MIGRATION: {
      await runMigrations()
      break
    }

    case DATABASE_ACTIONS.SEED_DATABASE: {
      await seedDatabase()
      break
    }

    case DATABASE_ACTIONS.ROLLBACK_LAST_MIGRATION: {
      await rollbackLastMigration()
      break
    }

    default: {
      throw new Error(`Unsupported action: ${action}!`)
    }
  }
})()
