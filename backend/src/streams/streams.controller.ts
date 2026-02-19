import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StreamsService } from './streams.service';
import { CreateStreamDto } from './dto/create-stream.dto';

@ApiTags('streams')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('spaces/:spaceId/streams')
export class StreamsController {
  constructor(private streamsService: StreamsService) {}

  @Post()
  create(@Param('spaceId') spaceId: string, @Body() dto: CreateStreamDto) {
    return this.streamsService.create(spaceId, dto);
  }

  @Get()
  findAll(@Param('spaceId') spaceId: string) {
    return this.streamsService.findBySpace(spaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamsService.findOne(id);
  }
}
