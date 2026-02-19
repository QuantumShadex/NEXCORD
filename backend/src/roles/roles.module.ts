import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from '../entities/role.entity';
import { Membership } from '../entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Membership])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
