import faker from 'faker'
import { Knex } from 'knex'

import { runIfNotInProduction } from '../utils/run-if-not-in-production'

type PostSeed = {
  content: string
  title: string
  user_id: number
  votes: number
}

type UserFromDatabase = {
  email: string
  id: number
  password: string
}

export async function up(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    const users: Array<UserFromDatabase> = await knex.table<UserFromDatabase>(`users`).select(`*`)

    const posts: Array<PostSeed> = users
      .flatMap((user: UserFromDatabase): Array<PostSeed> => {
        faker.seed(user.id)

        const userPostsCount: number = faker.datatype.number({ max: 15, min: 5, precision: 1 })

        return Array.from({ length: userPostsCount })
          .fill(null)
          .map((_: unknown, index: number): PostSeed => {
            const numberOfLinesInParagraph: number = faker.datatype.number({ max: 5, min: 1, precision: 1 })
            const [username]: Array<string> = user.email.split(`@`)
            const votes: number = faker.datatype.number({ max: 50, min: 5, precision: 1 })

            return {
              content: faker.lorem.paragraph(numberOfLinesInParagraph),
              title: `${username} post #${index}.`,
              user_id: user.id,
              votes
            }
          })
      })
      .flat(2)

    await knex.table<PostSeed>(`posts`).insert(posts)
  })
}

export async function down(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    await knex.table<PostSeed>(`posts`).delete()
  })
}
