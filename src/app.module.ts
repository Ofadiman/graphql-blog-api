import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import path from 'node:path'

import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './core/database/database.module'
import { AppValidationPipe } from './core/utils/pipes/validation.pipe'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      // The `autoSchemaFile` option allows you to specify where the graphql schema will be generated.
      autoSchemaFile: path.join(process.cwd(), `src/schema.gql`),
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // The `sortSchema` option causes the generated types to be sorted alphabetically in lexicographic order.
      sortSchema: true
    }),
    UsersModule,
    PostsModule,
    DatabaseModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: AppValidationPipe
    }
  ]
})
export class AppModule {}
