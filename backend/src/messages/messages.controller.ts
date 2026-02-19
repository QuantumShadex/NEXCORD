import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('streams/:streamId/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(@Param('streamId') streamId: string, @Request() req, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(streamId, req.user.id, dto);
  }

  @Get()
  findAll(@Param('streamId') streamId: string, @Query('limit') limit?: string, @Query('before') before?: string) {
    return this.messagesService.findByStream(streamId, limit ? parseInt(limit) : 50, before);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.messagesService.delete(id, req.user.id);
  }
}
