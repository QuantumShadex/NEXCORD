import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from './messages.service';

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000' } })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagesGateway.name);

  constructor(
    private messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.auth?.token as string) ||
        (client.handshake.headers?.authorization as string)?.replace('Bearer ', '');
      if (!token) {
        client.disconnect();
        return;
      }
      const payload = this.jwtService.verify<{ sub: string; username: string }>(token);
      (client as any).user = { id: payload.sub, username: payload.username };
      this.logger.log(`Client connected: ${client.id} (user: ${payload.username})`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_stream')
  handleJoinStream(@MessageBody() data: { streamId: string }, @ConnectedSocket() client: Socket) {
    client.join(`stream:${data.streamId}`);
    return { joined: data.streamId };
  }

  @SubscribeMessage('leave_stream')
  handleLeaveStream(@MessageBody() data: { streamId: string }, @ConnectedSocket() client: Socket) {
    client.leave(`stream:${data.streamId}`);
    return { left: data.streamId };
  }

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: { streamId: string; content: string; reply_to?: string }, @ConnectedSocket() client: Socket) {
    const authorId: string = (client as any).user?.id;
    if (!authorId) {
      client.emit('error', { message: 'Unauthorized' });
      return;
    }
    const message = await this.messagesService.create(data.streamId, authorId, { content: data.content, reply_to: data.reply_to });
    this.server.to(`stream:${data.streamId}`).emit('new_message', message);
    return message;
  }
}
