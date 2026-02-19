import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamsController } from './streams.controller';
import { StreamsService } from './streams.service';
import { Stream } from '../entities/stream.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stream])],
  controllers: [StreamsController],
  providers: [StreamsService],
  exports: [StreamsService],
})
export class StreamsModule {}
