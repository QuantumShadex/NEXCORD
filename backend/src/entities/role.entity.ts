import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Space } from './space.entity';
import { Membership } from './membership.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  space_id: string;

  @ManyToOne(() => Space, s => s.roles)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @Column()
  name: string;

  @Column({ default: '#6366f1' })
  color: string;

  @Column({ default: 0 })
  position: number;

  @Column({ type: 'jsonb', default: {} })
  permissions: Record<string, boolean>;

  @OneToMany(() => Membership, m => m.role)
  memberships: Membership[];
}
