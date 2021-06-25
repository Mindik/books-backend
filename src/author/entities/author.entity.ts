import { Transform } from 'class-transformer';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Author {
  constructor(partial: Partial<Author>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Transform(({ value }) => value.map((role) => role.value))
  @JoinTable({
    name: 'book_author',
    joinColumn: {
      name: 'bookUid',
      referencedColumnName: 'uid',
    },
    inverseJoinColumn: {
      name: 'authorUid',
      referencedColumnName: 'uid',
    },
  })
  @ManyToMany(() => Book, (book) => book.authors, { eager: true })
  books: Book[];
}
