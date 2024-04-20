import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRequired } from './middlewares/auth.required';
import { UsersController } from './modules/users/users.controller';
// import { ConversationModule } from './modules/conversation/conversation.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [UsersModule, AuthModule, SocketModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthRequired)
      .exclude('user/post', 'user')
      .forRoutes(UsersController);
  }
}
