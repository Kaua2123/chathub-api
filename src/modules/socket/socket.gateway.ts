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

  @SubscribeMessage('msg') // client envia algo pro server, a partir disso, o server emite isso pra todos os users
  handleMessage(socket: Socket, payload: string) {
    // socket.broadcast.emit('msg', payload, socket.id);
    this.server.emit('msg', payload, socket.id);
    console.log('msg:', payload);
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
