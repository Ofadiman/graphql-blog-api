import faker from 'faker'
import { Knex } from 'knex'

import { runIfNotInProduction } from '../utils/run-if-not-in-production'

type TagSeed = {
  name: string
}

type TagFromDatabase = {
  id: number
  name: string
}

type PostsTagsRelationship = {
  post_id: number
  tag_id: number
}

type PostFromDatabase = {
  content: string
  id: number
  title: string
  user_id: number
  votes: number
}

const javaScript: TagSeed = {
  name: `java_script`
}
const typeScript: TagSeed = {
  name: `type_script`
}
const programming: TagSeed = {
  name: `programming`
}
const workLifeBalance: TagSeed = {
  name: `work_life_balance`
}
const recruitment: TagSeed = {
  name: `recruitment`
}

export async function up(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    const tagsFromDatabase: Array<TagFromDatabase> = await knex
      .table<TagFromDatabase>(`tags`)
      .insert([javaScript, typeScript, programming, workLifeBalance, recruitment])
      .returning(`*`)

    const posts: Array<PostFromDatabase> = await knex.table<PostFromDatabase>(`posts`).select(`*`)

    const postsTagsRelationships: Array<PostsTagsRelationship> = posts
      .map((post: PostFromDatabase): Array<PostsTagsRelationship> => {
        faker.seed(post.id)

        const numberOfTagsAssociatedWithPost: number = faker.datatype.number({ max: 3, min: 1, precision: 1 })
        const pickedTags: Array<TagFromDatabase> = Array.from({ length: numberOfTagsAssociatedWithPost })
          .fill(null)
          .map((): TagFromDatabase => {
            return faker.random.arrayElement(tagsFromDatabase)
          })

        return pickedTags.map((pickedTag: TagFromDatabase): PostsTagsRelationship => {
          return {
            post_id: post.id,
            tag_id: pickedTag.id
          }
        })
      })
      .flat(2)

    await knex.table<PostsTagsRelationship>(`posts_tags`).insert(postsTagsRelationships)
  })
}

export async function down(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    await knex.table<PostsTagsRelationship>(`posts_tags`).delete()
    await knex.table<TagSeed>(`tags`).delete()
  })
}
