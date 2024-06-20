import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '../messages/message.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');
  private users = [];

  @SubscribeMessage('msg') // client envia algo pro server pelo canal msg, e aqui é recebido
  handleMessage(socket: Socket, payload: Message) {
    socket.broadcast.emit('receivedMsg', payload, socket.id);
  }

  // handleNewMessage -> sempre que tiver uma mensagem não lida, emitir um evento pra cá

  @SubscribeMessage('typing')
  handleTyping(socket: Socket, payload: boolean) {
    socket.broadcast.emit('userTyping', payload, socket.id);
  }

  @SubscribeMessage('newUser')
  handleNewUser(socket: Socket, payload: number) {
    // se chegou aqui, o usuario está online

    const user = {
      userId: payload,
      socketId: socket.id,
    };

    // checa se o usuário com id recebido já está online a fim de impedir a adição deste no array de users
    const alreadyHasUserId = this.users.some((user) => user.userId === payload);
    !alreadyHasUserId && this.users.push(user);

    console.log(this.users);
    this.emitOnlineUsers();
  }

  @SubscribeMessage('deletedMsg')
  handleDeletedMsg(socket: Socket, payload: boolean) {
    this.server.emit('msgDeleted', payload, socket.id);
  }

  @SubscribeMessage('updatedMsg')
  handleUpdatedMsg(socket: Socket, payload: boolean) {
    this.server.emit('msgUpdated', payload, socket.id);
  }

  @SubscribeMessage('readMsg')
  handleReadMsg(socket: Socket, payload: Message[]) {
    this.server.emit('msgRead', payload, socket.id);
  }

  @SubscribeMessage('unreadMsgs')
  handleUnreadMsgs(socket: Socket, payload: Message[]) {
    this.server.emit('unreadMsgsCounter', payload, socket.id);
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log('A user connected. user id:', client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('A user disconnected. user id:', client.id);

    // filtrando, onde o usuario tem o socket id difereente do client id (diferente do q desconectou)
    // se tá diferente, é porquê desconectou.
    this.users = this.users.filter((user) => user.socketId !== client.id);
    this.emitOnlineUsers();
  }

  private emitOnlineUsers() {
    this.server.emit('onlineUsers', this.users);
  }
}
