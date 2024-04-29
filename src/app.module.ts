import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRequired } from './middlewares/auth.required';
import { UsersController } from './modules/users/users.controller';
import { SocketModule } from './modules/socket/socket.module';
import { FriendRequestsModule } from './modules/friend-requests/friend-requests.module';
import { BlockedUsersModule } from './modules/blocked-users/blocked-users.module';
import { ConversationModule } from './modules/conversations/conversation.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FriendsModule } from './modules/friends/friends.module';
import { FriendRequestsController } from './modules/friend-requests/friend-requests.controller';
import { FriendsController } from './modules/friends/friends.controller';
import { ConversationController } from './modules/conversations/conversation.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SocketModule,
    FriendsModule,
    FriendRequestsModule,
    BlockedUsersModule,
    ConversationModule,
    MessagesModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthRequired)
      .exclude('user/create', 'user')
      .forRoutes(
        UsersController,
        FriendRequestsController,
        FriendsController,
        ConversationController,
      );
  }
}
