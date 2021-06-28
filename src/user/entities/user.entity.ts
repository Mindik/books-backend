import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany, Index, Unique } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { Book } from '../../book/entities/book.entity';
import { Role } from '../../role/entities/role.entity';
import { Token } from '../../token/entities/token.entity';

@Entity()
@Unique(['email'])
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  banned: boolean;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Transform(({ value }) => value.map((role) => role.value))
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'userUid',
      referencedColumnName: 'uid',
    },
    inverseJoinColumn: {
      name: 'roleUid',
      referencedColumnName: 'uid',
    },
  })
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  roles: Role[];

  @Exclude()
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @Transform(({ value }) => value.map((role) => role.value))
  @JoinTable({
    name: 'user_book',
    joinColumn: {
      name: 'userUid',
      referencedColumnName: 'uid',
    },
    inverseJoinColumn: {
      name: 'bookUid',
      referencedColumnName: 'uid',
    },
  })
  @ManyToMany(() => Book, (book) => book.users, { eager: true })
  books: Book[];
}
