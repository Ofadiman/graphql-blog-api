import { Knex } from 'knex'

import { runIfNotInProduction } from '../utils/run-if-not-in-production'

type UserSeed = {
  email: string
  password: string
}

const john: UserSeed = {
  email: `john@yopmail.com`,
  password: `$2b$12$aLbEirnfnNMOxUg.NZnyx.xJZcHvCsEZsfCAPrlWwpBHbfEMArj.K`
}

const james: UserSeed = {
  email: `james@yopmail.com`,
  password: `$2b$12$aLbEirnfnNMOxUg.NZnyx.xJZcHvCsEZsfCAPrlWwpBHbfEMArj.K`
}

const michael: UserSeed = {
  email: `michael@yopmail.com`,
  password: `$2b$12$aLbEirnfnNMOxUg.NZnyx.xJZcHvCsEZsfCAPrlWwpBHbfEMArj.K`
}

export async function up(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    await knex.table<UserSeed>(`users`).insert([john, james, michael])
  })
}

export async function down(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    await knex.table<UserSeed>(`users`).delete()
  })
}
