import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('spaces/:spaceId/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Param('spaceId') spaceId: string, @Body() dto: CreateRoleDto) {
    return this.rolesService.create(spaceId, dto);
  }

  @Get()
  findAll(@Param('spaceId') spaceId: string) {
    return this.rolesService.findBySpace(spaceId);
  }

  @Post(':roleId/assign/:userId')
  assignRole(@Param('spaceId') spaceId: string, @Param('roleId') roleId: string, @Param('userId') userId: string) {
    return this.rolesService.assignRole(userId, spaceId, roleId);
  }
}
