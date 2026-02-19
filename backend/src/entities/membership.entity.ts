import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Space } from './space.entity';
import { Role } from './role.entity';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  space_id: string;

  @Column({ nullable: true })
  role_id: string;

  @ManyToOne(() => User, u => u.memberships)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Space, s => s.memberships)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => Role, r => r.memberships, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  joined_at: Date;
}
