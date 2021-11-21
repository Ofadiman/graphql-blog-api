import faker from 'faker'
import { Knex } from 'knex'

import { runIfNotInProduction } from '../utils/run-if-not-in-production'

type ProfileSeed = {
  bio: string
  photo: string
  user_id: number
  username: string
}

type UserFromDatabase = {
  email: string
  id: number
  password: string
}

export async function up(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    const users: Array<UserFromDatabase> = await knex.table<UserFromDatabase>(`users`).select(`*`)

    const profiles: Array<ProfileSeed> = users.map((user: UserFromDatabase): ProfileSeed => {
      faker.seed(user.id)

      const numberOfLinesInParagraph: number = faker.datatype.number({ max: 4, min: 1, precision: 1 })
      const [username]: Array<string> = user.email.split(`@`)

      return {
        bio: faker.lorem.paragraph(numberOfLinesInParagraph),
        photo: `https://i.stack.imgur.com/l60Hf.png`,
        user_id: user.id,
        username
      }
    })

    await knex.table<ProfileSeed>(`profiles`).insert(profiles)
  })
}

export async function down(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    await knex.table<ProfileSeed>(`profiles`).delete()
  })
}
