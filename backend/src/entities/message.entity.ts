import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Stream } from './stream.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stream_id: string;

  @Column()
  author_id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  reply_to: string;

  @Column({ type: 'jsonb', default: {} })
  reactions: Record<string, string[]>;

  @Column({ default: false })
  pinned: boolean;

  @ManyToOne(() => Stream, s => s.messages)
  @JoinColumn({ name: 'stream_id' })
  stream: Stream;

  @ManyToOne(() => User, u => u.messages)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  edited_at: Date;
}
