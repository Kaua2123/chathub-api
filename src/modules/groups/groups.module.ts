import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class GroupModule {}
