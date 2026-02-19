import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';

@ApiTags('spaces')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('spaces')
export class SpacesController {
  constructor(private spacesService: SpacesService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateSpaceDto) {
    return this.spacesService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.spacesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacesService.findOne(id);
  }

  @Post(':id/join')
  join(@Request() req, @Param('id') id: string) {
    return this.spacesService.join(req.user.id, id);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.spacesService.getMembers(id);
  }
}
