import { User } from 'src/user/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  constructor(partial: Partial<Token>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @Index()
  token: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
