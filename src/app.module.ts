import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRequired } from './middlewares/auth.required';
import { UsersController } from './modules/users/users.controller';
import { SocketModule } from './modules/socket/socket.module';
import { FriendRequestsModule } from './modules/friend-requests/friend-requests.module';
import { BlockedUsersModule } from './modules/blocked-users/blocked-users.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FriendsModule } from './modules/friends/friends.module';
import { FriendRequestsController } from './modules/friend-requests/friend-requests.controller';
import { FriendsController } from './modules/friends/friends.controller';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ConversationsController } from './modules/conversations/conversations.controller';
import { ImagesModule } from './modules/images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BlockedUsersController } from './modules/blocked-users/blocked-users.controller';
import { MessagesController } from './modules/messages/messages.controller';
import { ImagesController } from './modules/images/images.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SocketModule,
    FriendsModule,
    FriendRequestsModule,
    BlockedUsersModule,
    ConversationsModule,
    MessagesModule,
    NotificationsModule,
    ImagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'images'), // Caminho para a pasta de imagens
      serveRoot: '/images', // Rota para acessar as imagens no navegador
    }),
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
        BlockedUsersController,
        FriendRequestsController,
        FriendsController,
        ConversationsController,
        MessagesController,
        ImagesController,
      );
  }
}
