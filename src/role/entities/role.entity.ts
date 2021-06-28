import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique(['value'])
export class Role {
  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  value: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
