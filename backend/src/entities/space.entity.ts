import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Membership } from './membership.entity';
import { Stream } from './stream.entity';
import { Role } from './role.entity';

@Entity('spaces')
export class Space {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon_url: string;

  @Column({ nullable: true })
  theme_color: string;

  @Column({ default: false })
  is_private: boolean;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Membership, m => m.space)
  memberships: Membership[];

  @OneToMany(() => Stream, s => s.space)
  streams: Stream[];

  @OneToMany(() => Role, r => r.space)
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;
}
