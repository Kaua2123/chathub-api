import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';

import 'dotenv/config';

const { DATABASE, DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } =
  process.env;

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: DATABASE_HOST,
      port: 3306,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE,
      models: [User],
    }),
    UsersModule,
  ],
})
export class AppModule {}
