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

    socket.emit('onlineUsers', this.users);
    console.log(this.users);
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log('A user connected. user id:', client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('A user disconnected. user id:', client.id);

    const index = this.users.findIndex((user) => user.socketId !== client.id);
    this.users = this.users.splice(index, 1);

    client.emit('onlineUsers', this.users);
  }
}
