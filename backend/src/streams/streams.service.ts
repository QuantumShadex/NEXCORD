import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stream } from '../entities/stream.entity';
import { CreateStreamDto } from './dto/create-stream.dto';

@Injectable()
export class StreamsService {
  constructor(@InjectRepository(Stream) private streamRepo: Repository<Stream>) {}

  async create(spaceId: string, dto: CreateStreamDto) {
    const count = await this.streamRepo.count({ where: { space_id: spaceId } });
    const stream = this.streamRepo.create({ ...dto, space_id: spaceId, position: count });
    return this.streamRepo.save(stream);
  }

  async findBySpace(spaceId: string) {
    return this.streamRepo.find({ where: { space_id: spaceId }, order: { position: 'ASC' } });
  }

  async findOne(id: string) {
    const stream = await this.streamRepo.findOne({ where: { id } });
    if (!stream) throw new NotFoundException('Stream not found');
    return stream;
  }
}
