import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/module/database.module';
import { usersProviders } from './users.providers';
import { UniqueConstraint } from 'src/custom-decorators/Unique';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, UniqueConstraint],
  exports: [UsersService],
})
export class UsersModule {}
