import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({ where: [{ email: dto.email }, { username: dto.username }] });
    if (existing) throw new ConflictException('Username or email already taken');
    const password_hash = await argon2.hash(dto.password);
    const user = this.userRepo.create({ username: dto.username, email: dto.email, password_hash });
    await this.userRepo.save(user);
    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await argon2.verify(user.password_hash, dto.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload), user: { id: user.id, username: user.username, email: user.email, avatar_url: user.avatar_url } };
  }
}
