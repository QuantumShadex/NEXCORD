import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from '../entities/space.entity';
import { Membership } from '../entities/membership.entity';
import { Role } from '../entities/role.entity';
import { CreateSpaceDto } from './dto/create-space.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space) private spaceRepo: Repository<Space>,
    @InjectRepository(Membership) private memberRepo: Repository<Membership>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  async create(userId: string, dto: CreateSpaceDto) {
    const space = this.spaceRepo.create({ ...dto, owner_id: userId });
    await this.spaceRepo.save(space);
    const everyoneRole = this.roleRepo.create({ space_id: space.id, name: 'everyone', position: 0, permissions: { view_streams: true, send_messages: true } });
    await this.roleRepo.save(everyoneRole);
    const membership = this.memberRepo.create({ user_id: userId, space_id: space.id });
    await this.memberRepo.save(membership);
    return space;
  }

  async findAll(userId: string) {
    const memberships = await this.memberRepo.find({ where: { user_id: userId }, relations: ['space'] });
    return memberships.map(m => m.space);
  }

  async findOne(id: string) {
    const space = await this.spaceRepo.findOne({ where: { id }, relations: ['streams', 'roles'] });
    if (!space) throw new NotFoundException('Space not found');
    return space;
  }

  async join(userId: string, spaceId: string) {
    const space = await this.findOne(spaceId);
    if (space.is_private) throw new ForbiddenException('Space is private');
    const existing = await this.memberRepo.findOne({ where: { user_id: userId, space_id: spaceId } });
    if (existing) return existing;
    const membership = this.memberRepo.create({ user_id: userId, space_id: spaceId });
    return this.memberRepo.save(membership);
  }

  async getMembers(spaceId: string) {
    return this.memberRepo.find({ where: { space_id: spaceId }, relations: ['user', 'role'] });
  }
}
