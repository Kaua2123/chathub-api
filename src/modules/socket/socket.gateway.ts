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

  @SubscribeMessage('msg') // client envia algo pro server pelo canal msg, e aqui é recebido
  handleMessage(socket: Socket, payload: Message) {
    socket.broadcast.emit('receivedMsg', payload, socket.id);
  }

  @SubscribeMessage('typing')
  handleTyping(socket: Socket, payload: boolean) {
    socket.broadcast.emit('userTyping', payload);
  }

  @SubscribeMessage('isOnline')
  handleIsOnline(socket: Socket, payload: boolean) {
    socket.broadcast.emit('userOnline', payload);
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log('A user connected. user id:', client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('A user disconnected. user id:', client.id);
  }
}
