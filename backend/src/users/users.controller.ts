import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('@me')
  getMe(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }
}
