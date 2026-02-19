import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Membership } from '../entities/membership.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Membership) private memberRepo: Repository<Membership>,
  ) {}

  async create(spaceId: string, dto: CreateRoleDto) {
    const role = this.roleRepo.create({ ...dto, space_id: spaceId });
    return this.roleRepo.save(role);
  }

  async findBySpace(spaceId: string) {
    return this.roleRepo.find({ where: { space_id: spaceId }, order: { position: 'DESC' } });
  }

  async assignRole(userId: string, spaceId: string, roleId: string) {
    const membership = await this.memberRepo.findOne({ where: { user_id: userId, space_id: spaceId } });
    if (!membership) throw new NotFoundException('Member not found');
    membership.role_id = roleId;
    return this.memberRepo.save(membership);
  }
}
