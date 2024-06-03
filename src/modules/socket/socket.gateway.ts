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
  private users = {};

  @SubscribeMessage('msg') // client envia algo pro server pelo canal msg, e aqui é recebido
  handleMessage(socket: Socket, payload: Message) {
    socket.broadcast.emit('receivedMsg', payload, socket.id);
  }

  @SubscribeMessage('typing')
  handleTyping(socket: Socket, payload: boolean) {
    socket.broadcast.emit('userTyping', payload, socket.id);
  }

  @SubscribeMessage('isOnline')
  handleIsOnline(socket: Socket, payload) {
    this.users[socket.id] = payload;
    socket.broadcast.emit('userOnline', payload, socket.id);
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log('A user connected. user id:', client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('A user disconnected. user id:', client.id);

    delete this.users[client.id];
  }
}
