import { Column, Entity, Index, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Author } from '../../author/entities/author.entity';
import { Year } from '../../year/entities/year.entity';

@Entity()
export class Book {
  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @Index()
  title: string;

  @OneToOne(() => Year)
  @JoinColumn()
  year: string;

  @ManyToMany(() => User, (user) => user.books)
  users: User[];

  @ManyToMany(() => Author, (author) => author.books)
  authors: Author[];
}
