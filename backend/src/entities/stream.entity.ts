import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Space } from './space.entity';
import { Message } from './message.entity';

export enum StreamType {
  TEXT = 'text',
  VOICE = 'voice',
  STAGE = 'stage',
  ANNOUNCEMENT = 'announcement',
  FORUM = 'forum',
}

@Entity('streams')
export class Stream {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  space_id: string;

  @ManyToOne(() => Space, s => s.streams)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @Column({ type: 'enum', enum: StreamType, default: StreamType.TEXT })
  type: StreamType;

  @Column()
  name: string;

  @Column({ nullable: true })
  topic: string;

  @Column({ default: 0 })
  position: number;

  @Column({ default: false })
  is_private: boolean;

  @OneToMany(() => Message, m => m.stream)
  messages: Message[];
}
