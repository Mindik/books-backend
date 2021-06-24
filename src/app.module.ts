import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CustomNamingStrategy } from './db/customNamingStrategy';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TokenModule } from './token/token.module';
import { YearModule } from './year/year.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          namingStrategy: new CustomNamingStrategy(),
        }),
    }),
    AuthModule,
    UserModule,
    BookModule,
    RoleModule,
    TokenModule,
    YearModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  // ],
})
export class AppModule {}
