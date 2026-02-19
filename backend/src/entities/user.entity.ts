import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Membership } from './membership.entity';
import { Message } from './message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Membership, m => m.user)
  memberships: Membership[];

  @OneToMany(() => Message, m => m.author)
  messages: Message[];
}
