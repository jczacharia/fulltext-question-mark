import {
  ChangeSet,
  ChangeSetType,
  EntityManager,
  EventSubscriber,
  FlushEventArgs,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { TestHistory } from './test-history.entity';
import { Test } from './test.entity';

@Injectable()
export class CaseHistorySubscriber implements EventSubscriber<Test> {
  constructor(private em: EntityManager) {
    this.em.getEventManager().registerSubscriber(this);
  }

  async onFlush(args: FlushEventArgs): Promise<void> {
    const changeSets = args.uow.getChangeSets() as ChangeSet<Partial<Test>>[];
    for (const cs of changeSets) {
      if (
        (cs.type === ChangeSetType.UPDATE ||
          cs.type === ChangeSetType.CREATE) &&
        cs.entity instanceof Test
      ) {
        const record = args.em.create(TestHistory, {
          ...cs.entity,
          id: nanoid(),
        });
        args.uow.computeChangeSet(record);
      }
    }
  }
}
