import { Module, ValidationPipe } from '@nestjs/common'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import path from 'node:path'

import { AuthModule } from './auth/auth.module'
import { JwtGuard } from './auth/guards/jwt.guard'
import { CoreModule } from './core/core.module'
import { DatabaseModule } from './database/database.module'
import { PostsModule } from './posts/posts.module'
import { ProfilesModule } from './profiles/profiles.module'
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
    AuthModule,
    CoreModule,
    ProfilesModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
        validationError: {
          target: false,
          value: true
        }
      })
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AppModule {}
