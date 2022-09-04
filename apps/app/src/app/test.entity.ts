import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';

@Entity()
export class Test {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ nullable: true })
  clientFirstName!: string;
  @Property({ nullable: true })
  clientMiddleName!: string;
  @Property({ nullable: true })
  clientLastName!: string;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    nullable: true,
    onUpdate: (e: Test) =>
      `${e.clientFirstName || ''} ${e.clientMiddleName || ''} ${
        e.clientLastName || ''
      }`
        .replace(/\s+/g, ' ')
        .trim(),
  })
  clientNameFull!: string;
}
