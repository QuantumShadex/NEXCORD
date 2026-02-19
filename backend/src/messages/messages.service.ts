import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepo: Repository<Message>) {}

  async create(streamId: string, authorId: string, dto: CreateMessageDto) {
    const message = this.messageRepo.create({ stream_id: streamId, author_id: authorId, content: dto.content, reply_to: dto.reply_to });
    const saved = await this.messageRepo.save(message);
    return this.messageRepo.findOne({ where: { id: saved.id }, relations: ['author'] });
  }

  async findByStream(streamId: string, limit = 50, before?: string) {
    const qb = this.messageRepo.createQueryBuilder('m')
      .where('m.stream_id = :streamId', { streamId })
      .leftJoinAndSelect('m.author', 'author')
      .orderBy('m.created_at', 'DESC')
      .limit(limit);
    if (before) {
      const msg = await this.messageRepo.findOne({ where: { id: before } });
      if (msg) qb.andWhere('m.created_at < :date', { date: msg.created_at });
    }
    const messages = await qb.getMany();
    return messages.reverse();
  }

  async delete(id: string, authorId: string) {
    const msg = await this.messageRepo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    if (msg.author_id !== authorId) throw new ForbiddenException('Cannot delete another user\'s message');
    await this.messageRepo.remove(msg);
    return { deleted: true };
  }
}
