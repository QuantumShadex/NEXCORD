import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SpacesModule } from './spaces/spaces.module';
import { StreamsModule } from './streams/streams.module';
import { MessagesModule } from './messages/messages.module';
import { RolesModule } from './roles/roles.module';
import { User } from './entities/user.entity';
import { Space } from './entities/space.entity';
import { Membership } from './entities/membership.entity';
import { Role } from './entities/role.entity';
import { Stream } from './entities/stream.entity';
import { Message } from './entities/message.entity';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'nexcord'),
        password: config.get('DB_PASSWORD', 'nexcord'),
        database: config.get('DB_NAME', 'nexcord'),
        entities: [User, Space, Membership, Role, Stream, Message],
        // synchronize is enabled by default since no migrations exist yet.
        // Set DB_SYNC=false to disable in production once migrations are in place.
        synchronize: config.get('DB_SYNC') !== 'false',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    SpacesModule,
    StreamsModule,
    MessagesModule,
    RolesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
